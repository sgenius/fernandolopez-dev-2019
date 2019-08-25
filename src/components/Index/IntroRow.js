import React from 'react';
import styled from 'styled-components';

import DefaultOneCol from 'components/DefaultOneCol';
import Background from 'components/Background';

const GriddedContainer = styled.div`
    display: grid;
    @media (min-width: 48rem) {
        grid-template-columns: auto auto;
        grid-column-gap: 3rem;
    }
`;

const GridCellEn = styled.div`
    grid-column: 1 / 2;
`;

const GridCellEs = styled.div`
    grid-column: 1 / 2;
    @media (min-width: 48rem) {
        grid-column: 2 / 3;
    }
`;

export default () => (
    <>
        <DefaultOneCol>
            <GriddedContainer>
                <GridCellEn>
                    <p className="subtitle">I am a frontend dev who cares about community and doing things well. Currently at Lyft, helping to make the world a better place.</p>
                </GridCellEn>
                <GridCellEs className="es">
                    <p className="subtitle">Soy un desarrollador frontend al que le importa la comunidad y hacer las cosas bien. Trabajo para Lyft, ayudando a hacer un mundo mejor.</p>
                </GridCellEs>
            </GriddedContainer>
            <Background />
        </DefaultOneCol>
    </>
);