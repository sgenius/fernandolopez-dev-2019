import React from 'react';
import { Root, Routes, addPrefetchExcludes } from 'react-static';

import TopBar from 'components/TopBar';

import { Router } from 'components/Router';
import Dynamic from 'containers/Dynamic';
import BottomBar from 'components/BottomBar';

import './app.css';

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic']);

function App() {
    return (
        <Root>
            <TopBar />
            <React.Suspense fallback={<em>Loading...</em>}>
                <Router>
                    <Dynamic path="dynamic" />
                    <Routes path="*" />
                </Router>
            </React.Suspense>
            <BottomBar />
        </Root>
    );
}

export default App;
