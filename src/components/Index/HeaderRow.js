import React from 'react';
import styled from 'styled-components';

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

export default () => (
    <>
        <StyledFirstCol>
            <StyledPreTitleWrap>
                <StyledPreTitle>Hi. I'm •&nbsp;</StyledPreTitle>
                <StyledPreTitle className="es">Hola. Soy</StyledPreTitle>
            </StyledPreTitleWrap>
            <StyledH1>Fernando L&oacute;pez. </StyledH1>
        </StyledFirstCol>
    </>
);