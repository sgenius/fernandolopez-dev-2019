import React from 'react';
import { fabric } from 'fabric';
import useFabric from './useFabric';

export const Mosaic = () => {
    const MOSAIC_DATA = {
        bounds: {
            xMin: 0,
            xMax: 4,
            yMin: 6,
            yMax: 6,
        },
        pieceDimensions: {
            width: 5,
            height: 3,
            multiplier: 30,
        },
        pieces: {},
        images: {
            path: '/images/mosaic/',
        },
        canvas: {
            scale: 0.1,
        },
    };

    // I could have done
    // const ref = useFabric(doTheMosaic)
    // but then, the fact that fabricCanvas is passed gets lost. This way is probably better for readability
    const ref = useFabric((fabricCanvas) =>
        doTheMosaic(fabricCanvas, MOSAIC_DATA)
    );

    return (
        <canvas ref={ref} />
    );
};

const doTheMosaic = (fabricCanvas, mosaicData) => {
    console.log('doTheMosaic > fabricCanvas: ', fabricCanvas);

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
    // const { scale } = canvas;

    console.log('loadFilesIntoCanvas > bounds: ', bounds);

    for (let xGrid = xMin; xGrid <= xMax; xGrid += 1) {
        console.log('=====\nxGrid: ', xGrid);
        for (let yGrid = yMax; yGrid >= yMin; yGrid -= 1) {
            console.log('-----\nyGrid: ', yGrid);
            loadAndPlacePiece(xGrid, yGrid, fabricCanvas, mosaicData);
        }
    }
};

const loadAndPlacePiece = (xGrid, yGrid, fabricCanvas, mosaicData) => {
    console.log('loadAndPlacePiece > xGrid: ', xGrid, ', yGrid: ', yGrid);
    const { pieces, pieceDimensions, images, bounds } = mosaicData;
    const { width, multiplier } = pieceDimensions;
    const { path } = images;

    const { xMin, yMin, yMax } = bounds;

    const xRef = (xGrid + xMin);

    const yRange = yMax - yMin;
    const yRef = yRange - yGrid + yMin; // these go in inverse order
    // const yRef = 0;
    console.log('loadAndPlacePiece > xRef: ', xRef, ', yRef: ', yRef);

    const gridCoords = `${xGrid},${yGrid}`;
    const file = `${path}${gridCoords}.jpg`;
    fabric.Image.fromURL(file, (loadedImg) => {
        pieces[gridCoords] = loadedImg; // eg. pieces['2,3']
        // loadedImg.scale(scale);

        const pixelWidth = width * multiplier;
        loadedImg.scaleToWidth(pixelWidth, false)

        const xInCanvas = xRef * pixelWidth;
        loadedImg.set('left', xInCanvas);

        const yInCanvas = yRef * pixelWidth;
        loadedImg.set('top', yInCanvas);

        fabricCanvas.add(loadedImg);
    });
};

export default Mosaic;