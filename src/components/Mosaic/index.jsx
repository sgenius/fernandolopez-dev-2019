import React, { useState } from 'react';
import MosaicControls from './MosaicControls';
import MosaicCanvas from './MosaicCanvas';

export const Mosaic = () => {
    const [mouseCoords, setMouseCoords] = useState({
        x: 0,
        y: 0,
    });
    const [zoom, setZoom] = useState(0);
    const [selectedFilters, setSelectedFilters] = useState(0);

    const handleSelectedFiltersChange = (evt) => {
        const newValue = evt.target.value;
        setSelectedFilters(newValue);
    };

    return (
        <div>
            <MosaicCanvas
                selectedFilters={selectedFilters}
                setMouseCoords={setMouseCoords}
                setZoom={setZoom}
            />
            <MosaicControls
                mouseCoords={mouseCoords}
                zoom={zoom}
                selectedFilters={selectedFilters}
                handleSelectedFiltersChange={handleSelectedFiltersChange}
            />
        </div>
    );
 };


export default Mosaic;