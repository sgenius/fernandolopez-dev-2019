import React from 'react';
import { fabric } from 'fabric';
import useFabric from './useFabric';

export const Mosaic = () => {
    const MOSAIC_DATA = {
        bounds: {
            xMin: -10,
            xMax: 10,
            yMin: -17,
            yMax: 9,
        },
        pieceDimensions: {
            width: 5,
            height: 3,
            multiplier: 10,
        },
        pieces: {},
        images: {
            path: '/images/mosaic/thumb_',
        },
        canvas: {
            zoomConfig: {
                step: 200,
                min: 0.01,
                max: 20,
            },

        },
    };

    const ref = useFabric((fabricCanvas) => {
        setUpCanvasEvents(fabricCanvas, MOSAIC_DATA);
        doTheMosaic(fabricCanvas, MOSAIC_DATA)
    });

    return (
        <canvas ref={ref} />
    );
};

const setUpCanvasEvents = (fabricCanvas, mosaicData) => {
    setUpZoom(fabricCanvas, mosaicData);
    setUpDrag(fabricCanvas, mosaicData);
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

        opt.e.preventDefault();
        opt.e.stopPropagation();
    });
}

const setUpDrag = (fabricCanvas, mosaicData) => {
    fabricCanvas.on('mouse:down', function(opt) {
        const evt = opt.e;
        console.log('evt: ', evt);
        if (evt.altKey === true) {
            this.isDragging = true;
            this.selection = false;
            this.lastPosX = evt.clientX;
            this.lastPosY = evt.clientY;
            console.log('this.isDragging: ', this.isDragging);
        }
    });

    fabricCanvas.on('mouse:move', function(opt) {
        if(this.isDragging) {
            const evt = opt.e;
            // viewportTransform has the format of canvas.transform:
            // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform
            this.viewportTransform[4] += evt.clientX - this.lastPosX;
            this.viewportTransform[5] += evt.clientY - this.lastPosY;
            this.requestRenderAll();
            this.lastPosX = evt.clientX;
            this.lastPosY = evt.clientY;
        }
    });

    fabricCanvas.on('mouse:up', function(opt) {
        this.isDragging = false;
        this.selection = true;
    });
}

const doTheMosaic = (fabricCanvas, mosaicData) => {
    setCanvasSize(fabricCanvas);
    loadFilesIntoCanvas(fabricCanvas, mosaicData);
    fabricCanvas.renderAll();
}

const setCanvasSize = (fabricCanvas) => {
    fabricCanvas.setHeight(600);
    fabricCanvas.setWidth(800);
};

const loadFilesIntoCanvas = (fabricCanvas, mosaicData) => {
    const { bounds } = mosaicData;
    const { xMin, xMax, yMin, yMax } = bounds;

    console.log('bounds: ', bounds);

    for (let xGrid = xMin; xGrid <= xMax; xGrid += 1) {
        for (let yGrid = yMax; yGrid >= yMin; yGrid -= 1) {
            loadPiece(xGrid, yGrid, fabricCanvas, mosaicData, () => {
                placePiece(xGrid, yGrid, fabricCanvas, mosaicData);
            });
            // loadAndPlacePiece(xGrid, yGrid, fabricCanvas, mosaicData);
        }
    }
};

const loadPiece = (xGrid, yGrid, fabricCanvas, mosaicData, callback) => {
    const { pieces, images } = mosaicData;
    const { path } = images;

    const gridCoords = `${xGrid},${yGrid}`;
    const file = `${path}${gridCoords}.jpg`;

    fabric.Image.fromURL(file, (loadedImg) => {
        pieces[gridCoords] = loadedImg; // eg. pieces['2,3']
        fabricCanvas.add(loadedImg);
        if(callback) {
            callback();
        }
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
    
    // console.log('loadAndPlacePiece(xGrid: ', xGrid, ', yGrid: ', yGrid, '):');
    // console.log('   xRef: ', xRef, ', yRef: ', yRef);

    const loadedImg = pieces[gridCoords];
    fabricCanvas.remove(loadedImg);

    const pixelWidth = width * multiplier;
    const pixelHeight = height * multiplier;
    loadedImg.scaleToWidth(pixelWidth, false)

    const xInCanvas = xRef * pixelWidth;
    loadedImg.set('left', xInCanvas);

    const yInCanvas = yRef * pixelHeight;
    loadedImg.set('top', yInCanvas);

    // console.log('   For gridCoords ', gridCoords, ': xInCanvas: ', xInCanvas, ', yInCanvas, ', yInCanvas);

    // https://github.com/fabricjs/fabric.js/wiki/When-to-call-setCoords
    loadedImg.setCoords();

    fabricCanvas.add(loadedImg);
};

export default Mosaic;