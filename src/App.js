import React from 'react';
import styled from 'styled-components';
import { Root, Routes, addPrefetchExcludes } from 'react-static';
//
import { Link, Router } from 'components/Router';
import Dynamic from 'containers/Dynamic';

import './app.css';

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic']);

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

function App() {
  return (
    <Root>
      <StyledNav>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/blog">Blog</StyledLink>
      </StyledNav>
      <div className="content">
        <React.Suspense fallback={<em>Loading...</em>}>
          <Router>
            <Dynamic path="dynamic" />
            <Routes path="*" />
          </Router>
        </React.Suspense>
      </div>
    </Root>
  );
}

export default App;
