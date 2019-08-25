import React from 'react';
import styled from 'styled-components';

import DefaultOneCol from 'components/DefaultOneCol';
import Background from 'components/Background';
import Link from 'components/Link';

const GriddedContainer = styled.div`
    display: grid;
    padding-bottom: 1rem;
    @media (min-width: 48rem) {
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 3rem;
        padding-bottom: 2rem;
    }
`;

const ProjectCell = styled.div`
    grid-column: 1;
    border: 1px solid #333;
    padding: 1rem;
`;

const EsSpan = styled.span`
    font-style: italic;
`;

export default () => (
    <>
        <DefaultOneCol>
            <h2>Projects / Proyectos</h2>
            <GriddedContainer>
                <ProjectCell>
                    <img src="images/the-worlds-countries.png" alt="Cropped screenshot" />
                    <h3><Link as="a" href="/countries">A Guide To The World's Countries</Link></h3>
                    <p>A simplistic World Almanac statically compiled using React Static and public APIs.</p>
                    <p><EsSpan>Un Almanaque Mundial simplista, construido est&aacute;ticamente usando React Static y APIs p&uacute;blicas. En ingl&eacute;s solamente.</EsSpan></p>
                </ProjectCell>
            </GriddedContainer>
            <Background bg="#f9f9f9"/>
        </DefaultOneCol>
    </>
);