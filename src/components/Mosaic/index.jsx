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
    fabricCanvas.on('mouse:wheel', function(opt) {
        const evt = opt.e;
        const { canvas } = mosaicData;
        const { zoomConfig } = canvas;
        const { step, max, min } = zoomConfig;

        const delta = evt.deltaY;
        let zoom = fabricCanvas.getZoom();
        zoom = zoom + delta/step;
        if (zoom > max) {
            zoom = max;
        }
        if (zoom < min) {
            zoom = min;
        }

        fabricCanvas.zoomToPoint({x: evt.offsetX, y: evt.offsetY}, zoom);

        updateCurrentImageSetByZoom(fabricCanvas, mosaicData);
        setZoom(zoom);

        evt.preventDefault();
        evt.stopPropagation();
    });

    fabricCanvas.on('mouse:down', function(opt) {
        const evt = opt.e;
        this.isDragging = true;
        this.selection = false;
        const clientCoords = getClientCoordsFromEvent(evt);
        this.lastPosX = clientCoords.x;
        this.lastPosY = clientCoords.y;
        
        // if this is actually a touch event, store all of the current touches.
        if (evt.touches) {
            this.touches = evt.touches;
            console.log('fabricCanvas.on(mouse:down) > touches: ', this.touches);
        }
    });

    fabricCanvas.on('mouse:move', function(opt) {
        const evt = opt.e;
        const pointer = getClientCoordsFromEvent(evt);
        setMouseCoords(pointer);

        console.log('fabricCanvas.on(mouse:move) > evt.touches: ', evt.touches);
        console.log('fabricCanvas.on(mouse:move) > this.touches: ', this.touches);

        if (this.touches && this.touches.length > 1 && evt.touches && evt.touches.length > 1) {
            console.log('fabricCanvas.on(mouse:move) > about to zoom?')
            // for (var i = 0; i < evt.touches.length; i++) {
            //     const touch = evt.touches.item(i);
            //     console.log('fabricCanvas.on(mouse:move) > touch #', i, ': ', touch);
            // }
            // do zoom using the two first registered touches

            // first, get the delta: 
            // - get the distance between the original points
            // - get the distance between the dragged points
            // - the difference is the delta
            const { canvas } = mosaicData;
            const { zoomConfig } = canvas;    
            const { step, max, min } = zoomConfig;

            const oldPoint0 = getClientCoordsFromEvent(this.touches.item(0));
            const oldPoint1 = getClientCoordsFromEvent(this.touches.item(1));

            const newPoint0 = getClientCoordsFromEvent(evt.touches.item(0));
            const newPoint1 = getClientCoordsFromEvent(evt.touches.item(1));

            const originalDistance = getDistanceBetweenPoints(oldPoint0, oldPoint1);
            const newDistance = getDistanceBetweenPoints(newPoint0, newPoint1);
            console.log('fabricCanvas.on(mouse:move) > originalDistance: ', originalDistance);
            console.log('fabricCanvas.on(mouse:move) > newDistance: ', newDistance);

            const delta = newDistance - originalDistance;
            let zoom = fabricCanvas.getZoom();
            zoom = zoom + delta / step;
            if (zoom > max) {
                zoom = max;
            }
            if (zoom < min) {
                zoom = min;
            }

            // the center point of the zoom is the middle point between the two *last* touches
            const pointToZoom = getMiddlePoint(newPoint0, newPoint1);

            fabricCanvas.zoomToPoint(pointToZoom, zoom);

            updateCurrentImageSetByZoom(fabricCanvas, mosaicData);
            setZoom(zoom);
    
            evt.preventDefault();
            evt.stopPropagation();

            // finally, update the touches saved in the fabricCanvas object
            this.touches = evt.touches;
        } else if(this.isDragging) {
            doDrag(this, pointer);
        }

        if (evt.touches) {
            this.touches = evt.touches;
        }
       
    });

    fabricCanvas.on('mouse:up', function(opt) {
        console.log('fabricCanvas.on(mouse:up)');
        this.touches = undefined;
        this.isDragging = false;
        this.selection = true;
    });
};

const getDistanceBetweenPoints = (point1, point2) => {
    console.log('getDistanceBetweenPoints > point1: ', point1);
    return Math.sqrt(Math.pow((point2.y - point1.y), 2) + Math.pow((point2.x - point1.x), 2));
}

const getMiddlePoint = (point1, point2) => {
    return {
        x: (point1.x + point2.x) / 2,
        y: (point1.y + point2.y) / 2,
    };
}

const getClientCoordsFromEvent = (evt) => {
    if (evt.clientX !== undefined) {
        return {
            x: evt.clientX,
            y: evt.clientY,
        }
    } else if (evt.targetTouches[0].clientX !== undefined) {
        return {
            x: evt.targetTouches[0].clientX,
            y: evt.targetTouches[0].clientY,
        }
    };
    return {
        x: undefined,
        y: undefined,
    };
}

const doDrag = (fabricCanvas, clientCoords) => {
    // viewportTransform has the format of canvas.transform:
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform
    fabricCanvas.viewportTransform[4] += clientCoords.x - fabricCanvas.lastPosX;
    fabricCanvas.viewportTransform[5] += clientCoords.y - fabricCanvas.lastPosY;
    fabricCanvas.requestRenderAll();
    fabricCanvas.lastPosX = clientCoords.x;
    fabricCanvas.lastPosY = clientCoords.y;
}



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