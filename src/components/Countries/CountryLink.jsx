import React from 'react';
import styled from 'styled-components';

import Link from 'components/Link';

const StyledCountryLink = styled(Link)`
    display: ${props => props.display};
    border: 1px solid #333;
    border-radius: 0.25rem;
    background: #f3f5f6;
    padding: 0.5rem;
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
    alpha2Code = '',
    alpha3Code = '',
    display = 'block',
}) => (
    <StyledCountryLink to={`/countries/${alpha3Code}`} display={display}>
        {alpha2Code && (
            <img src={`https://www.countryflags.io/${alpha2Code.toLowerCase()}/shiny/16.png`} alt={`Flag of ${name}`} />
        )}
        <CountryLinkName>{name}</CountryLinkName>
    </StyledCountryLink>
);

export default CountryLink;