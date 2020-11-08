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
    const [mapCoords, setMapCoords] = useState({
        x: 0,
        y: 0,
    });
    const [zoom, setZoom] = useState(0);

    const ref = useFabric((fabricCanvas) => {
        setUpCanvasEvents(fabricCanvas, MOSAIC_DATA, setMouseCoords, setZoom);
        doTheMosaic(fabricCanvas, MOSAIC_DATA);
    });

    return (
        <div>
            <canvas
                ref={ref}
            />
            <MosaicControls
                mouseCoords={mouseCoords}
                zoom={zoom}
            />
        </div>
    );
 };

const setUpCanvasEvents = (fabricCanvas, mosaicData, setMouseCoords, setZoom) => {
    setUpZoom(fabricCanvas, mosaicData, setZoom);
    setUpDrag(fabricCanvas, mosaicData, setMouseCoords);
};

const setUpZoom = (fabricCanvas, mosaicData, setZoom) => {
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
        setZoom(zoom);

        opt.e.preventDefault();
        opt.e.stopPropagation();
    });
};

const setUpDrag = (fabricCanvas, mosaicData, setMouseCoords) => {
    fabricCanvas.on('mouse:down', function(opt) {
        const evt = opt.e;
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
    });

    fabricCanvas.on('mouse:move', function(opt) {
        const evt = opt.e;
        let pointer = {
            x: undefined,
            y: undefined,
        };
        if (evt.clientX !== undefined) {
            // this is a mouse event
            pointer = {
                x: evt.clientX,
                y: evt.clientY,
            };
        } else {
            // this is a touch event
            pointer = {
                x: evt.targetTouches[0].clientX,
                y: evt.targetTouches[0].clientY,
            };
        }
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
        this.isDragging = false;
        this.selection = true;
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

const unloadAllPieces = (fabricCanvas, mosaicData) => {
    const { bounds } = mosaicData;
    const { xMin, xMax, yMin, yMax } = bounds;

    for (let xGrid = xMin; xGrid <= xMax; xGrid += 1) {
        for (let yGrid = yMax; yGrid >= yMin; yGrid -= 1) {
            unloadPiece(xGrid, yGrid, fabricCanvas, mosaicData);
        }
    }

    mosaicData.pieces = {};
}

const unloadPiece = (xGrid, yGrid, fabricCanvas, mosaicData) => {
    const { pieces } = mosaicData;
    const gridCoords = `${xGrid},${yGrid}`;

    const img = pieces[gridCoords];
    fabricCanvas.remove(img);
}

const reloadPieces = (fabricCanvas, mosaicData) => {
    unloadAllPieces(fabricCanvas, mosaicData);
    loadFilesIntoCanvas(fabricCanvas, mosaicData);
    fabricCanvas.renderAll();
}

export default Mosaic;