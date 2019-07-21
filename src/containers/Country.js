import React from 'react';
import styled from 'styled-components';
import { useRouteData } from 'react-static';

import DefaultOneCol from 'components/DefaultOneCol';
import Link from 'components/Link';
import CountryLink from 'components/Countries/CountryLink';
import { formatNumber } from 'helpers';

const StyledHeaderCol = styled(DefaultOneCol)`
    background: #fff;
    color: #111;
    border-bottom: 5px solid #2d394f;
`;

const StyledBackToCountriesLink = styled(Link)`
    padding: 0.5rem 0;
`;

const StyledH1 = styled.h1`
    font-family: 'Abril Fatface', serif;
    font-size: 4rem;
    margin: 3rem 0 0.25rem;
`;

const StyledCol = styled(DefaultOneCol)`
    background: #f3f5f6 url(/images/paper_fibers.png);
    color: #111;
`;

const StyledMapSection = styled.section`
    background: #222;
    text-align: center;
`;

const StyledMap = styled.img`
    display: inline-block;
    max-width: 100%;
`;

const StyledSectionTitle = styled.h2`
    color: #6685a1;
    font-size: 1.4rem;
    font-weight: normal;
    padding: 1rem 0 0.5rem;
    border-bottom: 1px solid #6685a1;
`;

const StyledDataTitle = styled.span`
    font-weight: bold;
    color: #6685a1;
    display: inline-block;
    border-right: 3px solid #6685a1;
    padding-right: 0.5rem;
    margin-right: 0.5rem;

`;

const StyledNote = styled.span`
    font-size: 0.8rem;
`;

const StyledUl = styled.ul`
    list-style: none;
`;

const StyledCountryLi = styled.li`
    margin: 0.25rem;
    display: inline-block;
`;

const FlagGridContainer = styled.div`
    display: block;
    @media (min-width: 48rem) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 1rem;
    }
`;

export default function Country() {
    const { gnData, restData, bordersLinkData } = useRouteData();
    console.log('route data: ', useRouteData());

    const MAPBOX_KEY = 'GauozURsWaWLTHQ5PC5c2qDG8M7RC4ET';

    const { north, west, south, east } = gnData;
    // Russia has weird dimensions; handle that case
    const boundingBox = east < west
        ? `${north},${east},${south},${west}`
        : `${north},${west},${south},${east}`;
    const mapWidth = 1000;
    const mapHeight = 400;
    const mapSize = `${mapWidth},${mapHeight}`;
    const mapUrl = `https://open.mapquestapi.com/staticmap/v5/map?key=${MAPBOX_KEY}&boundingBox=${boundingBox}&size=${mapSize}&type=map`;

    const ccLowerCase = gnData.countryCode.toLowerCase();
    const { countryName } = gnData;
    const { nativeName } = restData;

    const flagUrl = restData.flag;
    const moreFlagsUrl = `https://crwflags.com/fotw/flags/${ccLowerCase}.html`;
    const anthemUrl = `http://www.nationalanthems.info/${ccLowerCase}.mp3`;
    const anthemInfoUrl = `http://www.nationalanthems.info/${ccLowerCase}.htm`;
    const moreMapsUrl = `https://gadm.org/maps/${restData.alpha3Code}.html`;
    const wikiName = gnData.countryName.split(" ").join("_");
    const wikiUrl = `https://en.wikipedia.org/wiki/${wikiName}`;

    console.log('gnData: ', gnData);
    console.log('restData: ', restData);

    return (
        <main>
            <StyledHeaderCol>
                <StyledBackToCountriesLink as="a" href="/countries/">&#129080; Back to Countries</StyledBackToCountriesLink>
                <header>
                    <StyledH1>{countryName}</StyledH1>
                </header>
            </StyledHeaderCol>
            <StyledMapSection>
                <StyledMap alt={`Map of ${countryName}`} src={mapUrl} />
            </StyledMapSection>
            <StyledCol>
                <section>
                    <StyledSectionTitle>Flag and anthem</StyledSectionTitle>
                    <FlagGridContainer>
                        <div>
                            <img alt={`Flag of ${countryName}`} src={flagUrl} />
                            <p>
                                <Link as="a" href={moreFlagsUrl} target="_blank">More about the current flag(s) of {countryName} at crwflags.com</Link>
                            </p>
                        </div>
                        <div>
                            <p>
                                <StyledDataTitle>National Anthem</StyledDataTitle><br />
                                <audio controls src={anthemUrl}>
                                    Sorry, this media cannot be played here. Try clicking the link below instead:
                                </audio>
                            </p>
                            <p>
                                <StyledNote>
                                    <Link as="a" href={anthemInfoUrl} target="_blank">Info about the national anthem of {countryName} at nationalanthems.info</Link>
                                </StyledNote>
                            </p>
                        </div>
                    </FlagGridContainer>
                </section>
                <section>
                    <StyledSectionTitle>Geography</StyledSectionTitle>
                    <p><StyledDataTitle>Native name</StyledDataTitle> {nativeName}</p>
                    <p><StyledDataTitle>Alternate spellings</StyledDataTitle> {restData.altSpellings.join(', ')}</p>
                    <p><StyledDataTitle>Continent</StyledDataTitle> {gnData.continentName}, subregion: {restData.subregion}</p>
                    <p><StyledDataTitle>Borders</StyledDataTitle></p>
                    <StyledUl>
                        {bordersLinkData.map(bc => (
                            <StyledCountryLi key={`bc-${bc.alpha3Code}`}>
                                <CountryLink name={bc.name} alpha2Code={bc.alpha2Code} alpha3Code={bc.alpha3Code} display="inline-block" />
                            </StyledCountryLi>
                        ))}
                    </StyledUl>
                    <p><StyledNote><Link as="a" href={moreMapsUrl}>Thematic maps at gadm.org</Link></StyledNote></p>
                    <p><StyledDataTitle>Capital</StyledDataTitle> {gnData.capital}</p>
                    <p><StyledDataTitle>Area</StyledDataTitle> {formatNumber(restData.area)} km<sup>2</sup></p>
                    <p><StyledDataTitle>Population</StyledDataTitle> {formatNumber(restData.population)} people</p>
                    <p><StyledDataTitle>Demonym</StyledDataTitle> {restData.demonym}</p>
                    <p><StyledDataTitle>Official Languages</StyledDataTitle></p>
                    <StyledUl>
                        {restData.languages.map(lang => <li key={`lang-${lang.iso639_1}`}>{lang.name} ({lang.nativeName})</li>)}
                    </StyledUl>
                    <p><StyledDataTitle>Currencies</StyledDataTitle>
                    </p>
                    <StyledUl>
                        {restData.currencies.map(curr => (<li key={`cur-${curr.symbol}`}>{curr.name}, symbol: {curr.symbol}</li>))}
                    </StyledUl>
                    <p><StyledDataTitle>Belongs to these regional blocs</StyledDataTitle>
                    </p>
                    <StyledUl>
                        {restData.regionalBlocs.map(rb => (<li key={`rb-${rb.acronym}`}>{rb.acronym}, {rb.name}</li>))}
                    </StyledUl>
                    <p><StyledDataTitle>Timezones</StyledDataTitle> {restData.timezones.join(', ')}</p>
                    <p><StyledDataTitle>Calling codes</StyledDataTitle> {restData.callingCodes.join(',')}</p>
                    <p><StyledDataTitle>TLDs</StyledDataTitle> {restData.topLevelDomain.join(', ')}</p>
                </section>
                <section>
                    <StyledSectionTitle>Media</StyledSectionTitle>
                    <StyledUl>
                        <li><Link as="a" href={wikiUrl} target="_blank">This country in Wikipedia</Link></li>
                        <li>
                            <Link as="a" href={`https://www.youtube.com/results?search_query=${countryName}+news`} target="_blank">Youtube: news about this country</Link>
                        </li>
                        <li>
                            <Link as="a" href={`https://www.youtube.com/results?search_query=${nativeName}`} target="_blank">Youtube: videos about this country, in its native language</Link>
                        </li>
                    </StyledUl>
                </section>
                <section>
                    <StyledSectionTitle>Sources:</StyledSectionTitle>
                    <StyledUl>
                        <li><Link as="a" href="https://www.geonames.org">Geonames</Link></li>
                        <li><Link as="a" href="https://restcountries.eu">REST Countries</Link></li>
                        <li>Maps: <Link as="a" href="https://developer.mapquest.com/documentation/open/static-map-api/v5/map/">Mapquest API</Link></li>
                        <li>National anthem: <Link as="a" href="http://www.nationalanthems.info">nationalanthems.info</Link>;
                            licensed under a <Link as="a" href="https://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution 3.0 Unported License.</Link>
                        </li>
                    </StyledUl>
                </section>
            </StyledCol>
        </main>
    )
}
