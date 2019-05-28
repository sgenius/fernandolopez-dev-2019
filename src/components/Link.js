import React from 'react';
import styled from 'styled-components';

import { Link as RouterLink } from 'components/Router';
import COLORS from 'theme/colors';

const StyledLink = styled(RouterLink)`
    color: ${COLORS.link};
    :hover {
        color: ${COLORS.hoveredLink};
    }
    :active {
        color: ${COLORS.activeLink};
    }
    :visited {
        color: ${COLORS.visitedLink};
    }
`;

export const Link = (props) => (
    <StyledLink {...props} />
);

export default Link;