import React from 'react';
import DefaultOneCol from 'components/DefaultOneCol';
import Mosaic from 'components/Mosaic';

export const MosaicPage = () => (
    <main>
        <DefaultOneCol>
            <h1>Image mosaic on a canvas</h1>
            <Mosaic />
        </DefaultOneCol>
    </main>
);

export default MosaicPage;