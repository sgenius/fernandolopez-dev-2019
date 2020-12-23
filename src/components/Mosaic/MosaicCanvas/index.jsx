import React, { useEffect } from 'react';
import { MOSAIC_DATA } from '../constants';
import { useFabric } from './useFabric';
import { initFilterData, setUpCanvasEvents, doTheMosaic, refreshTheMosaic } from './helpers';


export const MosaicCanvas = ({selectedFilters, setMouseCoords, setZoom}) => {
    const ref = useFabric((fabricCanvas) => {
        console.log('useFabric.onChange');
        initFilterData(MOSAIC_DATA, selectedFilters);
        setUpCanvasEvents(fabricCanvas, MOSAIC_DATA, setMouseCoords, setZoom);
        doTheMosaic(fabricCanvas, MOSAIC_DATA);
    });

    useEffect(() => {
        console.log('MosaicCanvas > selectedFilters: ', selectedFilters);
        initFilterData(MOSAIC_DATA, selectedFilters);
        refreshTheMosaic(MOSAIC_DATA);
    }, [selectedFilters]);

    return (
        <canvas
            ref={ref}
        />
    );
}

export default MosaicCanvas;