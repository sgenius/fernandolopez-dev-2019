import React from 'react';
import styled from 'styled-components';

const DEFAULT_BG = 'url(/images/qbkls.png)';

const StyledBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    width: 100%;
    height: 100%;

    background: ${props => props.bg};
`;

export const Background = ({ bg = DEFAULT_BG }) => (
    <StyledBackground bg={bg} />
);

export default Background;