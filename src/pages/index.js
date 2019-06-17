import React from 'react';
import styled from 'styled-components';

import Background from 'components/Background';
import RandomTaco from 'components/RandomTaco';

const StyledPreTitleWrap = styled.div`
    padding-top: 1rem;
    
`;

const StyledPreTitle = styled.div`
    font-family: 'Merriweather', serif;
    font-weight: normal;
    font-size: 1.6rem;
    display: inline-block;
`;

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

const GridCellDivider = styled.div`
    border-left: 1px solid #111;
`

export default () => (
    <>
        <StyledPreTitleWrap>
            <StyledPreTitle>Hi. I'm •&nbsp;</StyledPreTitle>
            <StyledPreTitle className="es">Hola. Soy</StyledPreTitle>
        </StyledPreTitleWrap>
        <h1>Fernando L&oacute;pez. </h1>

        <GriddedContainer>
            <GridCellEn>
                <p className="subtitle">I am a frontend dev who cares about community and doing things well. Currently at Lyft, helping to make the world a better place.</p>
            </GridCellEn>
            <GridCellEs className="es">
                <p className="subtitle">Soy un desarrollador frontend al que le importa la comunidad y hacer las cosas bien. Trabajo para Lyft, ayudando a hacer un mundo mejor.</p>
            </GridCellEs>
        </GriddedContainer>
        <RandomTaco />
        <Background />
    </>
);