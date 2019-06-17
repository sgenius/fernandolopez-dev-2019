import React from 'react';
import styled from 'styled-components';

import DefaultOneCol from 'components/DefaultOneCol';
import COLORS from 'theme/colors';

const TopBarSection = styled.section`
    width: 100%;

    text-transform: uppercase;
    font-size: 0.7rem;
    letter-spacing: 0.2rem;

    background-color: ${COLORS.highlight1};
    color: ${COLORS.highlight4};
`;

export const TopBar = () => (
    <TopBarSection>
        <DefaultOneCol>
            fernandolopez.dev
        </DefaultOneCol>
    </TopBarSection>
);

export default TopBar;