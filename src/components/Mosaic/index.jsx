import React, { useRef, useCallback } from 'react';
import { fabric } from 'fabric';

// https://stackoverflow.com/questions/37565041/how-can-i-use-fabric-js-with-react
const useFabric = (onChange) => {
    const fabricRef = useRef();
    const disposeRef = useRef();
    return useCallback((node) => {
        if (node) {
            fabricRef.current = new fabric.Canvas(node);
            if (onChange) {
                disposeRef.current = onChange(fabricRef.current);
            }
        }
        else if (fabricRef.current) {
            fabricRef.current.dispose();
            if (disposeRef.current) {
                disposeRef.current();
                disposeRef.current = undefined;
            }
        }
    }, []);
};

export const Mosaic = () => {
    const ref = useFabric((fabricCanvas) => {
        console.log('fabricCanvas: ', fabricCanvas);
        // fabric.Image.fromURL('images/mosaic/0,6.jpg', (loadedImg) => {
        //     loadedImg.scale(0.2);
        //     fabricCanvas.add(loadedImg);
        // });
    });

    
    // return null;
    return (
        <canvas
            ref={ref}
            style={{
                width: '100%',
                height: '80vh',
            }}
        />
    );
};

export default Mosaic;