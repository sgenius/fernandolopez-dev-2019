// import path from 'path'
import axios from 'axios'

export default {
    getRoutes: async () => {
        const countriesResponse = await axios.get(
            'https://secure.geonames.org/countryInfoJSON?lang=en&username=fa_lopez&style=full'
        );

        const gnCountriesData = countriesResponse.data || [];
        const gnCountries = gnCountriesData.geonames;

        const restCountriesResponse = await axios.get('https://restcountries.eu/rest/v2/all');
        const restCountriesData = restCountriesResponse.data || [];

        const mlCountriesResponse = await axios.get('https://raw.githubusercontent.com/mledoze/countries/master/dist/countries.json');
        const mlCountriesData = mlCountriesResponse.data || [];        

        const thisCountryGnData = code => gnCountries.find(elem => elem.countryCode === code);
        const thisCountryRestData = code => restCountriesData.find(elem => elem.alpha2Code === code);
        const thisCountryGnDataByIsoAlpha3 = code => gnCountries.find(elem => elem.isoAlpha3 === code);

        const independentMlCountries = mlCountriesData.filter(country => country.independent);

        const countryLinkData = (code) => {
            const thisCountryObj = thisCountryGnDataByIsoAlpha3(code) || {};
            if (Object.keys(thisCountryObj).length === 0) {
                return {};
            }
            const { countryName, countryCode, isoAlpha3 } = thisCountryObj;
            return {
                name: countryName,
                alpha2Code: countryCode,
                alpha3Code: isoAlpha3,
            };
        }
        const bordersLinkData = (bordersArr) => {
            if (!Array.isArray(bordersArr)) {
                return [];
            }
            return bordersArr.map(alpha3Code => countryLinkData(alpha3Code));
        }

        const countriesData = independentMlCountries.map(mlCountry => {
            const code = mlCountry.cca2;
            const gnCountry = thisCountryGnData(code);
            const restCountry = thisCountryRestData(code);

            return {
                ...restCountry,
                ...gnCountry,
                ...mlCountry,
                flagUrl: restCountry.flag,
            };
        });
        
        return [
            // {
            //     path: '/blog',
            //     getData: () => ({
            //         posts,   
            //     }),
            //     children: posts.map(post => ({
            //         path: `/post/${post.id}`,
            //         template: 'src/containers/Post',
            //         getData: () => ({
            //             post,
            //         }),
            //     })),
            // },
            {
                path: '/countries',
                getData: () => ({
                    countriesData,
                }),
                children: countriesData.map(country => ({
                    path: `/${country.cca2}`,
                    template: 'src/containers/Country',
                    getData: () => {
                        return {
                            country,
                            bordersLinkData: bordersLinkData(country.borders),
                        };
                    },
                })),
            },
        ]
    },
    plugins: [
        [
            require.resolve('react-static-plugin-source-filesystem'),
            {
                location: './src/pages',
            },
        ],
        require.resolve('react-static-plugin-reach-router'),
        require.resolve('react-static-plugin-sitemap'),
        require.resolve('react-static-plugin-styled-components'),
    ],
}
