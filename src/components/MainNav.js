import React from 'react';
import styled from 'styled-components';

import { Link } from 'components/Router';

const StyledNav = styled.nav`
    width: 100%;
    border-bottom: 1px solid #eee;
`;

const StyledLink = styled(Link)`
    display: inline-block;
    color: #108db8;
    padding: 1rem 2rem;
    text-decoration: none;
`;

export const MainNav = () => (
    <StyledNav>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/blog">Blog</StyledLink>
    </StyledNav>
);

export default MainNav;