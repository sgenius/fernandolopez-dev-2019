import React from 'react';
import styled from 'styled-components';

import DefaultOneCol from 'components/DefaultOneCol';
import COLORS from 'theme/colors';

const BottomBarSection = styled.section`
    width: 100%;
    padding-top: 1rem;
    margin-top: 1rem;

    font-size: 0.8rem;
`;

export const BottomBar = () => (
    <BottomBarSection>
        <DefaultOneCol>
            <p>linkedin</p>
            <p>github</p>
            <p>twitter</p>
            <p>my old blog about maps</p>
        </DefaultOneCol>
    </BottomBarSection>
);

export default BottomBar;