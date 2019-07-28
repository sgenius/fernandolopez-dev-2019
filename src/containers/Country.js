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

const StyledLi = styled.li`
    margin: 0.25rem;
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

const CiaMapFloat = styled.div`
    padding: 0 0 1rem 1rem;
    float: right;
    font-size: 0.8rem;
`;

export default function Country() {
    const { country, bordersLinkData } = useRouteData();
    console.log('route data: ', useRouteData());

    const MAPBOX_KEY = 'GauozURsWaWLTHQ5PC5c2qDG8M7RC4ET';
    const { north, west, south, east } = country;
    // Russia has weird dimensions; handle that case
    const boundingBox = east < west
        ? `${north},${east},${south},${west}`
        : `${north},${west},${south},${east}`;
    const mapWidth = 1000;
    const mapHeight = 400;
    const mapSize = `${mapWidth},${mapHeight}`;
    const mapUrl = `https://open.mapquestapi.com/staticmap/v5/map?key=${MAPBOX_KEY}&boundingBox=${boundingBox}&size=${mapSize}&type=map`;

    const ccLowerCase = country.countryCode.toLowerCase();
    const countryName = country.name.common;
    const countryNameArr = countryName.toLowerCase().split(" ");
    const countryNameKebab = countryNameArr.join("-");
    const countryNameSnake = countryNameArr.join("_");

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
                            <img alt={`Flag of ${countryName}`} src={country.flagUrl} />
                            <p>
                                <Link as="a" href={`https://crwflags.com/fotw/flags/${ccLowerCase}.html`} target="_blank">More about the current flag(s) of {countryName} at crwflags.com</Link>
                            </p>
                        </div>
                        <div>
                            <p>
                                <StyledDataTitle>National Anthem</StyledDataTitle><br />
                                <audio controls src={`http://www.nationalanthems.info/${ccLowerCase}.mp3`}>
                                    Sorry, this media cannot be played here. Try clicking the link below instead:
                                </audio>
                            </p>
                            <p>
                                <StyledNote>
                                    <Link as="a" href={`http://www.nationalanthems.info/${ccLowerCase}.htm`} target="_blank">Info about the national anthem of {countryName} at nationalanthems.info</Link>
                                </StyledNote>
                            </p>
                        </div>
                    </FlagGridContainer>
                </section>
                <section>
                    <StyledSectionTitle>Geography</StyledSectionTitle>
                    <CiaMapFloat>
                        <img src={`https://www.cia.gov/library/publications/the-world-factbook/attachments/maps/${country.fipsCode}-map.gif`} alt="Map by The World Factbook, CIA"/>
                        <br />Map source: The CIA World Factbook
                    </CiaMapFloat>
                    <p><StyledDataTitle>Official name</StyledDataTitle> {country.name.official}</p>
                    <p><StyledDataTitle>Alternate spellings</StyledDataTitle> {country.altSpellings.join(', ')}</p>
                    <p><StyledDataTitle>Continent</StyledDataTitle> {country.continentName}, subregion: {country.subregion}</p>
                    <p><StyledDataTitle>Borders</StyledDataTitle></p>
                    <StyledUl>
                        {bordersLinkData.map(bc => (
                            <StyledCountryLi key={`bc-${bc.alpha2Code}`}>
                                <CountryLink name={bc.name} cca2={bc.alpha2Code} />
                            </StyledCountryLi>
                        ))}
                    </StyledUl>
                    <p><StyledNote><Link as="a" href={`https://gadm.org/maps/${country.alpha3Code}.html`}>Thematic maps at gadm.org</Link></StyledNote></p>
                    <p><StyledDataTitle>Capital</StyledDataTitle> {country.capital.join(', ')}</p>
                    <p><StyledDataTitle>Area</StyledDataTitle> {formatNumber(country.area)} km<sup>2</sup></p>
                    <p><StyledDataTitle>Population</StyledDataTitle> {formatNumber(country.population)} people</p>
                    <p><StyledDataTitle>Demonym</StyledDataTitle> {country.demonym}</p>
                    <p><StyledDataTitle>Official Languages</StyledDataTitle></p>
                    <StyledUl>
                        {Object.keys(country.languages).map((langKey) => {
                            const lang = country.languages[langKey];
                            return (<StyledLi key={`lang-${langKey}`}>{lang}</StyledLi>);
                        })}
                    </StyledUl>
                    <p><StyledDataTitle>Currencies</StyledDataTitle>
                    </p>
                    <StyledUl>
                        {Object.keys(country.currencies).map(
                            (currKey) => {
                                const { name, symbol } = country.currencies[currKey];
                                return (<StyledLi key={`cur-${currKey}`}>{name}, symbol: {symbol}</StyledLi>);
                            }
                        )}
                    </StyledUl>
                    <p><StyledDataTitle>Belongs to these regional blocs</StyledDataTitle>
                    </p>
                    <StyledUl>
                        {country.regionalBlocs.map(rb => (<StyledLi key={`rb-${rb.acronym}`}>{rb.acronym}, {rb.name}</StyledLi>))}
                    </StyledUl>
                    <p><StyledDataTitle>Timezones</StyledDataTitle> {country.timezones.join(', ')}</p>
                    <p><StyledDataTitle>Calling codes</StyledDataTitle> {country.callingCodes.join(',')}</p>
                    <p><StyledDataTitle>TLDs</StyledDataTitle> {country.topLevelDomain.join(', ')}</p>
                </section>
                <section>
                    <StyledSectionTitle>This country in other sources</StyledSectionTitle>
                    <p>Continue your research in these resources:</p>
                    <StyledUl>
                        <StyledLi>
                            <Link as="a" href={`https://www.cia.gov/library/publications/the-world-factbook/geos/${country.fipsCode.toLowerCase()}.html`} target="_blank">The CIA World Factbook</Link>
                        </StyledLi>
                        <StyledLi>
                            <Link as="a" href={`https://data.worldbank.org/country/${countryNameKebab}`} target="_blank">The World Bank databank</Link>                            
                        </StyledLi>
                        <StyledLi>
                            <Link as="a" href={`https://en.wikipedia.org/wiki/${countryNameSnake}`} target="_blank">wikipedia</Link>                            
                        </StyledLi>                        
                        <StyledLi>
                            <Link as="a" href={`https://ourworldindata.org/country/${countryNameKebab}`} target="_blank">Our World In Data. Hundreds of indicators and graphs</Link>
                        </StyledLi>
                        <StyledLi>
                            <Link as="a" href={`https://countryeconomy.com/countries/${countryNameKebab}`} target="_blank">This country in countryeconomy.com</Link>
                        </StyledLi>
                        <StyledLi>
                            <Link as="a" href={`https://www.youtube.com/results?search_query=${countryName}+news`} target="_blank">Youtube: news about this country</Link>
                        </StyledLi>
                        <StyledLi>
                            <Link as="a" href={`https://www.youtube.com/results?search_query=geography+now+${countryName}`} target="_blank">Youtube: Geography Now!</Link>
                        </StyledLi>                                                
                    </StyledUl>
                </section>
                <section>
                    <StyledSectionTitle>Sources:</StyledSectionTitle>
                    <StyledUl>
                        <StyledLi><Link as="a" href="https://www.geonames.org">Geonames</Link></StyledLi>
                        <StyledLi><Link as="a" href="https://restcountries.eu">REST Countries</Link></StyledLi>
                        <StyledLi>Maps: <Link as="a" href="https://developer.mapquest.com/documentation/open/static-map-api/v5/map/">Mapquest API</Link></StyledLi>
                        <StyledLi>National anthem: <Link as="a" href="http://www.nationalanthems.info">nationalanthems.info</Link>;
                            licensed under a <Link as="a" href="https://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution 3.0 Unported License.</Link>
                        </StyledLi>
                    </StyledUl>
                </section>
            </StyledCol>
        </main>
    )
}
