import React from 'react';
import styled from 'styled-components';
import { Root, Routes, addPrefetchExcludes } from 'react-static';
import { Container, Row, Col } from 'react-awesome-styled-grid';

import { Router } from 'components/Router';
import MainNav from 'components/MainNav';
import Dynamic from 'containers/Dynamic';

import './app.css';

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic']);

function App() {
    return (
        <Root>
            <MainNav />
            <Container>
                <Row>
                    <Col xs={4} sm={6} lg={8} offset={{ sm: 1, lg: 2 }}>
                        <React.Suspense fallback={<em>Loading...</em>}>
                            <Router>
                                <Dynamic path="dynamic" />
                                <Routes path="*" />
                            </Router>
                        </React.Suspense>
                    </Col>
                </Row>
            </Container>
        </Root>
    );
}

export default App;
