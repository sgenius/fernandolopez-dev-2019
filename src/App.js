import React from 'react';
// import styled from 'styled-components';
import { Root, Routes, addPrefetchExcludes } from 'react-static';
import { Container, Row, Col } from 'react-awesome-styled-grid';

import TopBar from 'components/TopBar';

import { Router } from 'components/Router';
import Dynamic from 'containers/Dynamic';
import DefaultOneCol from 'components/DefaultOneCol';
import BottomBar from 'components/BottomBar';

import './app.css';

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic']);

function App() {
    return (
        <Root>
            <TopBar />
            <DefaultOneCol>
                <React.Suspense fallback={<em>Loading...</em>}>
                    <Router>
                        <Dynamic path="dynamic" />
                        <Routes path="*" />
                    </Router>
                </React.Suspense>
            </DefaultOneCol>
            <BottomBar />
        </Root>
    );
}

export default App;
