import React from 'react';
import styled from 'styled-components';

import Link from 'components/Link';

const StyledCountryLink = styled(Link)`
    display: inline-block;
    border: 3px solid #8B7077;
    border-width: 0 0 3px;
    background: #f3f5f6;
    padding: 0.2rem;
    color: #8B7077;
    &:hover {
        background: #fff;
    }
`;

const CountryLinkName = styled.span`
    display: inline-block;
    margin-left: 0.5rem;
`;

export const CountryLink = ({
    name = '',
    cca2 = '',
}) => (
    <StyledCountryLink to={`/countries/${cca2}`}>
        {cca2 && (
            <img src={`https://www.countryflags.io/${cca2.toLowerCase()}/shiny/16.png`} alt={`Flag of ${name}`} />
        )}
        <CountryLinkName>{name}</CountryLinkName>
    </StyledCountryLink>
);

export default CountryLink;