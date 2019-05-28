import React from 'react';
// import styled from 'styled-components';
import { Root, Routes, addPrefetchExcludes } from 'react-static';
import { Container, Row, Col } from 'react-awesome-styled-grid';

// import MainNav from 'components/MainNav';
import BottomBar from 'components/BottomBar';
import DefaultOneCol from 'components/DefaultOneCol';
import { Router } from 'components/Router';
import TopBar from 'components/TopBar';
import Dynamic from 'containers/Dynamic';

import './app.css';

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic']);

function App() {
    return (
        <Root>
            <TopBar />
            {/* <MainNav /> */}
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
