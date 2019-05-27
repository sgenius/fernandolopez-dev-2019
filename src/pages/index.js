import React from 'react';
import styled from 'styled-components';

const StyledH1 = styled.h1`
    font-family: 'Merriweather', serif;
    font-weight: normal;
    font-size: 1.6rem;
`;

const StyledSubtitle = styled.p`
    font-family: 'Merriweather', serif;
    font-weight: normal;
    font-size: 1.4rem;
`;

export default () => (
    <>
        <StyledH1>Hi. I'm Fernando L&oacute;pez. </StyledH1>
        <StyledSubtitle>I am a web crafter who cares about community and doing things well.</StyledSubtitle>
        <p>Here would be some autobiographical notes? Also mention that I'm at Lyft.</p>
        <p>Here I'll be putting links to projects that I'll build in this same space, as if it was a blog, really. A blog of projects.</p>
        <p>Here I want a list of social media with icons.</p>
        <p>Probably also a link to Mapas, Mapas.</p>
        <p>Still need to think about how to make this bilingual.</p>
        <p>A bridge. I want an illustration. Probably old-timey and simple.</p>
    </>
);