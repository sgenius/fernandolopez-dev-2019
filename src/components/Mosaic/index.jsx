import React from 'react';
import { fabric } from 'fabric';
import useFabric from './useFabric';

export const Mosaic = () => {
    // I could have done
    // const ref = useFabric(doTheMosaic)
    // but then, the fact that fabricCanvas is passed gets lost. This way is probably better for readability
    const ref = useFabric((fabricCanvas) =>
        doTheMosaic(fabricCanvas)
    );

    return (
        <canvas ref={ref} />
    );
};

export const doTheMosaic = (fabricCanvas) => {
    console.log('fabricCanvas: ', fabricCanvas);
    setCanvasSize(fabricCanvas);
    loadFilesIntoCanvas(fabricCanvas);
    fabricCanvas.renderAll();
}

export const setCanvasSize = (fabricCanvas) => {
    fabricCanvas.setHeight(600);
    fabricCanvas.setWidth(800);
};

export const loadFilesIntoCanvas = (fabricCanvas) => {
    const Y_MIN = 0;
    const Y_MAX = 4;
    const PATH = 'images/mosaic/';
    const SCALE = 0.2;

    for (let yCoord = Y_MIN; yCoord <= Y_MAX; yCoord += 1) {
        const file = `${PATH}0,${yCoord}.jpg`;
        fabric.Image.fromURL(file, (loadedImg) => {
            loadedImg.scale(SCALE);
            fabricCanvas.add(loadedImg);
        });
    }
};

export default Mosaic;