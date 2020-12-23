import { useRef, useCallback } from 'react';
import { fabric } from 'fabric';
import { MOSAIC_DATA } from '../constants';

// https://stackoverflow.com/questions/37565041/how-can-i-use-fabric-js-with-react
export const useFabric = (onChange) => {
    const fabricRef = useRef();
    const disposeRef = useRef();
    return useCallback((node) => {
        if (node) {
            fabricRef.current = new fabric.Canvas(node);
            MOSAIC_DATA.currentRef = fabricRef.current;
            if (onChange) {
                disposeRef.current = onChange(fabricRef.current);
            }
        }
        else if (fabricRef.current) {
            MOSAIC_DATA.currentRef = null;
            fabricRef.current.dispose();
            if (disposeRef.current) {
                disposeRef.current();
                disposeRef.current = undefined;
            }
        }
    }, []);
};

export default useFabric;