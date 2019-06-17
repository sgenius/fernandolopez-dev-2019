import React from 'react';
import styled from 'styled-components';

import Background from 'components/Background';
import RandomTaco from 'components/RandomTaco';
import DefaultOneCol from 'components/DefaultOneCol';

const StyledFirstCol = styled(DefaultOneCol)`
    background-color: #222;
`;

const StyledPreTitleWrap = styled.div`
    padding-top: 1rem;
`;

const StyledPreTitle = styled.div`
    font-family: 'Merriweather', serif;
    font-weight: normal;
    font-size: 1.6rem;
    display: inline-block;
    color: #ccc;
`;

const StyledH1 = styled.h1`
    margin: 0;
    font-size: 3rem;
    color: rgba(255, 255, 255, 0.7);
    text-shadow: 0 0 3px rgba(255, 255, 255, 0.5);
    -webkit-background-clip: text;
    background-clip: text;
    font-family: 'Abril Fatface', serif;
    
    @media only screen and (min-width: 48rem) {
        font-size: 4rem;
    }
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

export default () => (
    <>
        <StyledFirstCol>
            <StyledPreTitleWrap>
                <StyledPreTitle>Hi. I'm •&nbsp;</StyledPreTitle>
                <StyledPreTitle className="es">Hola. Soy</StyledPreTitle>
            </StyledPreTitleWrap>
            <StyledH1>Fernando L&oacute;pez. </StyledH1>
        </StyledFirstCol>
        <DefaultOneCol>
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
        </DefaultOneCol>
    </>
);