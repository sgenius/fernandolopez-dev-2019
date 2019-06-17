import React from 'react';
import styled from 'styled-components';
import COLORS from 'theme/colors';

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


const StyledSubtitle = styled.p`
    font-family: 'Merriweather', serif;
    font-weight: normal;
    font-size: 1.2rem;
`;

const StyledSubtitleEs = styled(StyledSubtitle)`
    font-style: italic;
`;

export default () => (
    <>
        <StyledPreTitleWrap>
            <StyledPreTitle>Hi. I'm •&nbsp;</StyledPreTitle>
            <StyledPreTitle className="es">Hola. Soy</StyledPreTitle>
        </StyledPreTitleWrap>
        <h1>Fernando L&oacute;pez. </h1>
        <p className="subtitle">I am a frontend dev who cares about community and doing things well. Currently at Lyft, helping to make the world a better place.</p>
        <p className="subtitle es">Soy un desarrollador frontend al que le importa la comunidad y hacer las cosas bien. Trabajo para Lyft, ayudando a hacer un mundo mejor.</p>
        <RandomTaco />
        <Background />
    </>
);