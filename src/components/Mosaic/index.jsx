import React, { useState } from 'react';
import { fabric } from 'fabric';
import MosaicControls from './MosaicControls';
import useFabric from './useFabric';
import { MOSAIC_DATA } from './constants';

export const Mosaic = () => {
    const [mouseCoords, setMouseCoords] = useState({
        x: 0,
        y: 0,
    });
    const ref = useFabric((fabricCanvas) => {
        setUpCanvasEvents(fabricCanvas, MOSAIC_DATA, setMouseCoords);
        doTheMosaic(fabricCanvas, MOSAIC_DATA);
    });

    return (
        <div>
            <canvas
                ref={ref}
            />
            <MosaicControls
                mouseCoords={mouseCoords}
            />
        </div>
    );
 };

const setUpCanvasEvents = (fabricCanvas, mosaicData, setMouseCoords) => {
    console.log('setUpCanvasEvents');
    setUpZoom(fabricCanvas, mosaicData);
    setUpDrag(fabricCanvas, mosaicData, setMouseCoords);
};

const setUpZoom = (fabricCanvas, mosaicData) => {
    fabricCanvas.on('mouse:wheel', function(opt) {
        const { canvas } = mosaicData;
        const { zoomConfig } = canvas;
        const { step, max, min } = zoomConfig;

        const delta = opt.e.deltaY;
        let zoom = fabricCanvas.getZoom();
        zoom = zoom + delta/step;
        if (zoom > max) {
            zoom = max;
        }
        if (zoom < min) {
            zoom = min;
        }

        fabricCanvas.zoomToPoint({x: opt.e.offsetX, y: opt.e.offsetY}, zoom);

        updateCurrentImageSetByZoom(fabricCanvas, mosaicData);

        opt.e.preventDefault();
        opt.e.stopPropagation();
    });
};

const setUpDrag = (fabricCanvas, mosaicData, setMouseCoords) => {
    fabricCanvas.on('mouse:down', function(opt) {
        // if (opt.target) {
        //     console.log('an object was clicked: ', opt.target.type);
        // }
        const evt = opt.e;
        console.log('mouse:down > evt: ', evt);
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
    });

    fabricCanvas.on('mouse:move', function(opt) {
        const evt = opt.e;
        console.log('mouse:move > evt: ', evt);
        let pointer = {
            x: undefined,
            y: undefined,
        };
        if (evt.clientX !== undefined) {
            // this is a mouse event
            // pointer = fabricCanvas.getPointer(evt, false);
            pointer = {
                x: evt.clientX,
                y: evt.clientY,
            };
        } else {
            // this is a touch event
            console.log('mouse:move > evt.targetTouches[0]: ', evt.targetTouches[0])
            pointer = {
                x: evt.targetTouches[0].clientX,
                y: evt.targetTouches[0].clientY,
            };
        }
        console.log('mouse:move > pointer: ', pointer);
        setMouseCoords(pointer);
        if(this.isDragging) {
            // viewportTransform has the format of canvas.transform:
            // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform
            this.viewportTransform[4] += pointer.x - this.lastPosX;
            this.viewportTransform[5] += pointer.y - this.lastPosY;
            this.requestRenderAll();
            this.lastPosX = pointer.x;
            this.lastPosY = pointer.y;
        }
       
    });

    fabricCanvas.on('mouse:up', function(opt) {
        console.log('mouse:up');
        this.isDragging = false;
        this.selection = true;
    });

    fabricCanvas.on('touch:drag', function(ppt) {
        console.log('touch:drag');
    });
};

const doTheMosaic = (fabricCanvas, mosaicData) => {
    setCanvasSize(fabricCanvas);
    loadFilesIntoCanvas(fabricCanvas, mosaicData);
    fabricCanvas.renderAll();
};

const setCanvasSize = (fabricCanvas) => {
    fabricCanvas.setHeight(500);
    fabricCanvas.setWidth(695);
};

const loadFilesIntoCanvas = (fabricCanvas, mosaicData) => {
    const { bounds } = mosaicData;
    const { xMin, xMax, yMin, yMax } = bounds;

    for (let xGrid = xMin; xGrid <= xMax; xGrid += 1) {
        for (let yGrid = yMax; yGrid >= yMin; yGrid -= 1) {
            loadPiece(xGrid, yGrid, fabricCanvas, mosaicData);
        }
    }
};

const loadPiece = (xGrid, yGrid, fabricCanvas, mosaicData) => {
    const { pieces, imageSets, currentImageSet } = mosaicData;
    const gridCoords = `${xGrid},${yGrid}`;
    const path = imageSets[currentImageSet].path;
    const file = `${path}${gridCoords}.jpg`;

    fabric.Image.fromURL(file, (loadedImg) => {
        pieces[gridCoords] = loadedImg; // eg. pieces['2,3']
        loadedImg.selectable = false;
        fabricCanvas.add(loadedImg);
        placePiece(xGrid, yGrid, fabricCanvas, mosaicData);
    });
}

const placePiece = (xGrid, yGrid, fabricCanvas, mosaicData) => {
    const { pieces, pieceDimensions, bounds } = mosaicData;
    const { width, height, multiplier } = pieceDimensions;
    const { xMin, yMin, yMax } = bounds;

    const xRef = (xGrid - xMin);
    const yRange = yMax - yMin;
    const yRef = yRange - yGrid + yMin; // these go in inverse order

    const gridCoords = `${xGrid},${yGrid}`;
    
    const loadedImg = pieces[gridCoords];

    const pixelWidth = width * multiplier;
    const pixelHeight = height * multiplier;
    loadedImg.scaleToWidth(pixelWidth, true)

    const xInCanvas = xRef * pixelWidth;
    loadedImg.set('left', xInCanvas);

    const yInCanvas = yRef * pixelHeight;
    loadedImg.set('top', yInCanvas);

    // https://github.com/fabricjs/fabric.js/wiki/When-to-call-setCoords
    loadedImg.setCoords();

    fabricCanvas.add(loadedImg);
};

const updateCurrentImageSetByZoom = (fabricCanvas, mosaicData) => {
    const { imageSets, currentImageSet } = mosaicData;
    const zoom = fabricCanvas.getZoom();
    let zoomChanged = false;

    console.log('updateCurrentImageSetByZoom > currentImageSet: ', currentImageSet, ', imageSets.length: ', imageSets.length);
    if (currentImageSet < imageSets.length - 1 && imageSets[currentImageSet + 1].minZoom < zoom) {
        mosaicData.currentImageSet += 1;
        zoomChanged = true;
    }

    if (currentImageSet > 0 && imageSets[currentImageSet].minZoom > zoom) {
        mosaicData.currentImageSet -= 1;
        zoomChanged = true;
    }

    if (zoomChanged) {
        reloadPieces(fabricCanvas, mosaicData);
    }
}

const reloadPieces = (fabricCanvas, mosaicData) => {
    loadFilesIntoCanvas(fabricCanvas, mosaicData);
    fabricCanvas.renderAll();
}

export default Mosaic;