import React from 'react';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
    display: inline-block;
    padding: 0.5rem;
    background: #222;
    border-width: 2px;
    color: #ffa;
    font-size: 10px;
    font-family: monospace;
    ${props => props.active && css`
        background: #ffa;
        color: #222;
    `};
`;

export const Button = ({
    text,
    active,
    onClick,
}) => {
    return (
        <StyledButton
            onClick={onClick}
            active={active}
        >
            {text}
        </StyledButton>
    )
};

export default Button;