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
                    <p>
                        <EsSpan>Un Almanaque Mundial simplista, construido est&aacute;ticamente usando React Static y APIs p&uacute;blicas. En ingl&eacute;s solamente.</EsSpan>
                    </p>
                </ProjectCell>
                <ProjectCell>
                    <img src="images/mosaic-screenshot.png" alt="Cropped screenshot" />
                    <h3><Link as="a" href="/mosaic">Map Mosaic</Link></h3>
                    <p>A barebones renderer for scanned pieces of an off-line imaginary map. Use the mouse to interact with the map. Uses <Link as="a" href="http://fabricjs.com/">Fabric</Link>, a React library for canvas manipulation.</p>
                    <p>
                        <EsSpan>Un desplegador muy básico para mostrar piezas escaneadas de un mapa imaginario. Usa el mouse para interactuar con el mapa. Hecho con <Link as="a" href="http://fabricjs.com/">Fabric</Link>, una biblioteca de React para manipulación de canvas.</EsSpan>
                    </p>
                </ProjectCell>
            </GriddedContainer>
            <Background bg="#f9f9f9" />
        </DefaultOneCol>
    </>
);