import { errorHandler } from '../Handlers/ErrorHandler';
import { Location } from '../Interfaces';
import axios from 'axios';
import { URLS, AccuWeatherAPIKey } from '../Constants/Constants';
import { toast } from 'react-toastify';

import locationData from '../Constants/TelAvivLocationExample.json';
import currentWeatherData from '../Constants/CurrentWeatherExample.json';
import forecastData from '../Constants/FiveDayForecastExample.json';
import exampleData from '../Constants/AutoCompleteResponseExample.json';

export const WeatherService = {
    fetchTelAviv: async () => {
        try {
            // fetch tel aviv as default location and get the key to query tel aviv's current weather and forecast
            // const locationResponse = await axios.get(
            //     `${URLS.LOCATION_AUTO_COMPLETE}?apikey=${AccuWeatherAPIKey}&q=Tel%20Aviv`
            // );
            // const locationData = locationResponse.data[0];

            // use tel aviv's key to query and set the current weather
            // const weatherResponse = await axios.get(
            //     `${URLS.CURRENT_WEATHER}/${locationData.Key}?apikey=${AccuWeatherAPIKey}`
            // );
            // const currentWeatherData = weatherResponse.data;

            // use tel aviv's key to query and set the forecast
            // const forecastResponse = await axios.get(
            //     `${URLS.FIVE_DAY_FORECAST}/${locationData.Key}?apikey=${AccuWeatherAPIKey}`
            // );
            // const forecastData = forecastResponse.data;

            return { locationData, currentWeatherData, forecastData };
        } catch (err) {
            errorHandler(err);
        }
    },

    fetchAutoComplete: async (
        searchParam: string,
        setLocations: React.Dispatch<React.SetStateAction<Location[]>>
    ) => {
        if (searchParam === '') {
            return;
        }
        try {
            // const response = await axios.get(
            //     `${URLS.LOCATION_AUTO_COMPLETE}?apikey=${AccuWeatherAPIKey}&q=${searchParam}`
            // );
            // setLocations((previousLocations) => [...response.data]);
            setLocations([...exampleData]);
        } catch (err) {
            errorHandler(err);
        }
    },

    fetchLocation: async (locations: Location[]) => {
        if (locations.length === 0) {
            toast.error('Location not found');
            return;
        }
        const location = locations[0];
        if (locations.length > 1) {
            toast.info(
                `Found more then 1 location.\nMake sure to use the auto complete for exact match.\nShowing ${location.LocalizedName} ${location.Country.LocalizedName} ${location.AdministrativeArea.LocalizedName}`
            );
        }
        try {
            const currentWeatherResponse = await axios.get(
                `${URLS.CURRENT_WEATHER}/${location.Key}?apikey=${AccuWeatherAPIKey}`
            );
            const currentWeather = currentWeatherResponse.data;
            const forecastResponse = await axios.get(
                `${URLS.FIVE_DAY_FORECAST}/${location.Key}?apikey=${AccuWeatherAPIKey}`
            );
            const forecast = forecastResponse.data;
            return { location, currentWeather, forecast };
        } catch (err) {
            errorHandler(err);
        }
    },
};
