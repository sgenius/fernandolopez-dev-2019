import React from 'react';
import styled from 'styled-components';

const StyledH1 = styled.h1`
    font-family: 'Merriweather', serif;
    font-weight: normal;
    font-size: 2.4rem;
`;

const StyledSubtitle = styled.p`
    font-family: 'Merriweather', serif;
    font-weight: normal;
    font-size: 1.4rem;
`;

export default () => (
    <>
        <StyledH1>Hi. I'm Fernando L&oacute;pez. </StyledH1>
        <StyledSubtitle>I am a frontend dev who cares about community and doing things well. Currently at Lyft, helping to make the world a better place.</StyledSubtitle>
        <p>A bridge. I want an illustration. Probably old-timey and simple.</p>
    </>
);