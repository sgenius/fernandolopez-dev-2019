import React from 'react';
import styled from 'styled-components';
import { useRouteData } from 'react-static'
import Link from 'components/Link';
import DefaultOneCol from 'components/DefaultOneCol';
import CountryLink from 'components/Countries/CountryLink';

const StyledHeaderCol = styled(DefaultOneCol)`
    background: #fff;
    color: #111;
    border-bottom: 5px solid #2d394f;
`;

const StyledH1 = styled.h1`
    font-family: 'Abril Fatface', serif;
    font-size: 2rem;
    margin: 3rem 0 0.25rem;
`;

const StyledH1Span = styled.span`
    display: block;
    font-size: 6rem;
    line-height: 0.75;
`;

const StyledCol = styled(DefaultOneCol)`
    background: #f3f5f6 url(/images/paper_fibers.png);
    color: #111;
`;

const StyledUl = styled.ul`
    list-style: none;
    margin-left: 0;
    padding: 0;
`;

const StyledLi = styled.li`
    display: inline-block;
    margin: 0.5rem 1rem 0.5rem 0;
`;

const RegionName = styled.h2`
    padding-bottom: 0;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #2d394f;

    font-family: 'Abril Fatface', serif;
    color: #2d394f;
    font-size: 2rem;
`;

const sortCountriesByName = (countries) => {
    return countries.sort((country1, country2) => {
        const name1 = country1.name.common;
        const name2 = country2.name.common;
        if (name1 < name2) {
            return -1;
        } else if (name1 > name2) {
            return 1;
        }
        return 0;
    });
};

const groupCountriesByRegion = (countries) => {
    const groupedCountries = {};
    countries.forEach((country) => {
        const { region } = country;
        const regionGroup = groupedCountries[region] || [];
        regionGroup.push(country);
        groupedCountries[region] = regionGroup;
    });

    const groupedCountriesArr = Object.values(groupedCountries);
    groupedCountriesArr.forEach(countryGroup => sortCountriesByName(countryGroup));

    return groupedCountries;
};

const makeCountryList = (countryArray) => {
    const countryList = countryArray.map((country => (
        <StyledLi key={`li-country-${country.cca3}`}>
            <CountryLink
                name={country.name.common}
                alpha2Code={country.cca2}
                alpha3Code={country.cca3}
                display={'inline-block'}
            />
        </StyledLi>
    )), []);

    return (
        <StyledUl>
            {countryList}
        </StyledUl>
    );
}

const makeRegionalCountryList = (countryArray, regionName) => (
    <section key={`regionList-${regionName.replace(' ', '')}`}>
        <RegionName>{regionName}</RegionName>
        { makeCountryList(countryArray) }
    </section>
);

const makeRegionalCountryLists = (countriesByRegion) => {
    const countryLists = [];
    for (let [regionName, countryArray] of Object.entries(countriesByRegion)) {
        countryLists.push(makeRegionalCountryList(countryArray, regionName));
    }
    return countryLists;
}

export const Countries = () => {
    const countries = useRouteData().restCountries;
    const countriesByRegion = groupCountriesByRegion(countries);
    console.log('route data: ', useRouteData());

    const countryLists = makeRegionalCountryLists(countriesByRegion);
    return (
        <main>
            <StyledHeaderCol>
                <StyledH1>A Guide To The World's <StyledH1Span>Countries.</StyledH1Span></StyledH1>
            </StyledHeaderCol>
            <StyledCol>
                <p>Before I loved web development, I loved geography. As a child, I used to buy 
                    these yearly World Almanacs. This intends to be pretty much like that: a reference
                    for the world's countries, with basic data to jumpstart a research session.</p>
                <p>This was created as an experiment to test the power of static websites - in this case, <Link as="a" href="https://github.com/nozzle/react-static">React Static</Link>. Data from 
                    two APIs, <Link as="a" href="https://www.geonames.org">Geonames</Link> and <Link as="a" href="https://restcountries.eu">REST Countries</Link>, 
                    was consumed at compilation time to generate static pages which are fast to load, yet extremely versatile. 
                </p>
                {countryLists}
                <section>
                    Sources (thanks to all of you!):
                    <ul>
                        <li><Link as="a" href="https://www.geonames.org">Geonames</Link></li>
                        <li><Link as="a" href="https://restcountries.eu">REST Countries</Link></li>
                        <li>Flag icons in this page from <Link as="a" href="https://www.countryflags.io">countryflags.io</Link>.</li>
                        <li>Maps in the country pages: <Link as="a" href="https://developer.mapquest.com/documentation/open/static-map-api/v5/map/">Mapquest API</Link></li>
                        <li>National anthems: <Link as="a" href="http://www.nationalanthems.info">nationalanthems.info</Link>;
                            licensed under a <Link as="a" href="https://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution 3.0 Unported License.</Link>
                        </li>
                    </ul>
                    <p>For a similar project with a different take check out <Link as="a" href="http://countries.petethompson.net/">Countries of the World</Link>. Also, <Link as="a" href="https://github.com/mledoze/countries">mledoze's countries database</Link> is just awesome.</p>

                </section>
            </StyledCol>
        </main>
    );
}

export default Countries;