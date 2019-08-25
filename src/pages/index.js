import React from 'react';
import styled from 'styled-components';

import Background from 'components/Background';
import RandomTaco from 'components/RandomTaco';
import DefaultOneCol from 'components/DefaultOneCol';

import IntroRow from 'components/Index/IntroRow';
import HeaderRow from 'components/Index/HeaderRow';
import ProjectsRow from 'components/Index/ProjectsRow';

export default () => (
    <>
        <HeaderRow />
        <IntroRow />
        <ProjectsRow />
        <DefaultOneCol>
            <RandomTaco />
            <Background />
        </DefaultOneCol>
    </>
);