import React from 'react';
import styled from 'styled-components';

const StyledBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    width: 100%;
    height: 100%;

    background: url(/images/${props => props.src});
`;

export const Background = ({ src = 'qbkls.png' }) => (
    <StyledBackground src={src} />
);

export default Background;