import { fabric } from 'fabric';

export const MOSAIC_DATA = {
    bounds: {
        xMin: -3,
        xMax: 12,
        yMin: -17,
        yMax: 10,
    },
    pieceDimensions: {
        width: 5,
        height: 3,
        multiplier: 10,
    },
    pieces: {},
    imageSets: [
        {
            minZoom: 0,
            path: '/images/mosaic/thumb_',
        },
        {
            minZoom: 2.5,
            path: '/images/mosaic/',
        },  
    ],
    currentImageSet: 0,
    canvas: {
        zoomConfig: {
            step: 200,
            min: 0.5,
            max: 15,
        },
    },
    activeFilters: [],
};

export const AVAILABLE_FILTERS = {
    sharpen: new fabric.Image.filters.Convolute({
        matrix: [ 0, -1,  0,
                 -1,  5, -1,
                  0, -1,  0 ]
    }),
    blur: new fabric.Image.filters.Convolute({
        matrix: [ 1/9, 1/9, 1/9,
                  1/9, 1/9, 1/9,
                  1/9, 1/9, 1/9 ]
    }),

    // https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/filters/ColorMatrixFilter.html
    highlightContourLines: new fabric.Image.filters.ColorMatrix({
        matrix: [
              0.5, 0, 0.5, 0, 0,
              0.5, 0, 0.5, 0, 0,
              0.5, 0, 0.5, 0, 0,
              0, 0, 0, 1, 0,
        ],
    }),
    highlightCoasts: new fabric.Image.filters.ColorMatrix({
        matrix: [
              1, 0, 0, 0, 0,
              1, 0, 0, 0, 0,
              1, 0, 0, 0, 0,
              0, 0, 0, 1, 0,
        ],
    }),
    inverseHighlightRoadsAndContourLineNumbers: new fabric.Image.filters.ColorMatrix({
        matrix: [
              1, -1, -0.5, 0, 0.5,
              1, -1, -0.5, 0, 0.5,
              1, -1, -0.5, 0, 0.5,
              0, 0, 0, 1, 0,
        ],
    }),
    inverseHighlightPoliticalDivisionAndFreeways: new fabric.Image.filters.ColorMatrix({
        matrix: [
              -0.9, 1.5, -0.6, 0, 0.7,
              -0.9, 1.5, -0.6, 0, 0.7,
              -0.9, 1.5, -0.6, 0, 0.7,
              0, 0, 0, 1, 0,
        ],
    }),
    removePoliticalDivision:  new fabric.Image.filters.RemoveColor({
        color: '#e5a6b1',
        distance: 0.2,
    }),
    removeSecondaryRoads1: new fabric.Image.filters.RemoveColor({
        color: '#d94c52',
        distance: 0.2,
    }),
    removeSecondaryRoads2: new fabric.Image.filters.RemoveColor({
        color: '#db6246',
        distance: 0.2,
    }),
    removeSecondaryRoads3: new fabric.Image.filters.RemoveColor({
        color: '#ea9ba6',
        distance: 0.2,
    }),
    removePrimaryRoads: new fabric.Image.filters.RemoveColor({
        color: '#da5462',
        distance: 0.2,
    }),
    removeCoasts: new fabric.Image.filters.RemoveColor({
        color: '#696eb3',
        distance: 0.4,
    }),
    removeContourLines: new fabric.Image.filters.RemoveColor({
        color: '#fde09e',
        distance: 0.2,
    }),
    removeContourLineNumbers: new fabric.Image.filters.RemoveColor({
        color: '#ea9731',
        distance: 0.1,
    }),
};
