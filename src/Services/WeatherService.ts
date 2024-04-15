import { errorHandler } from '../Handlers/ErrorHandler';
import { ILocation, ICurrentWeather, IForecast } from '../Interfaces';
import axios from 'axios';
import { URLS, AccuWeatherAPIKey } from '../Constants/Constants';
import { toast } from 'react-toastify';

// import locationData from '../Constants/TelAvivLocationExample.json';
// import currentWeatherData from '../Constants/CurrentWeatherExample.json';
// import forecastData from '../Constants/FiveDayForecastExample.json';
// import autoCompleteExample from '../Constants/AutoCompleteResponseExample.json';

export type WeatherData = {
    locationData: ILocation;
    currentWeatherData: ICurrentWeather[];
    forecastData: IForecast;
};

export const WeatherService = {
    fetchAutoComplete: async (
        searchParam: string
    ): Promise<ILocation[] | undefined> => {
        if (searchParam === '') {
            return;
        }
        try {
            const response = await axios.get(
                `${URLS.LOCATION_AUTO_COMPLETE}?apikey=${AccuWeatherAPIKey}&q=${searchParam}`
            );
            return response.data;
            // return autoCompleteExample;
        } catch (err) {
            errorHandler(err);
        }
    },

    fetchWeather: async (
        location: ILocation
    ): Promise<ICurrentWeather[] | undefined> => {
        try {
            const currentWeatherResponse = await axios.get(
                `${URLS.CURRENT_WEATHER}/${location.Key}?apikey=${AccuWeatherAPIKey}`
            );
            const currentWeather = currentWeatherResponse.data;
            return currentWeather;
            // return currentWeatherData;
        } catch (err) {
            errorHandler(err);
        }
    },

    fetchWeatherAndForecast: async (
        locations: ILocation[]
    ): Promise<WeatherData | undefined> => {
        if (locations.length === 0) {
            toast.error('Location not found');
            return;
        }
        const locationData = locations[0];
        if (locations.length > 1) {
            toast.info(
                `Found more then 1 location.\n
                Make sure to use the auto complete for exact match.\n
                Showing ${locationData.LocalizedName} ${locationData.Country.LocalizedName} ${locationData.AdministrativeArea.LocalizedName}`
            );
        }
        try {
            const currentWeatherResponse = await axios.get(
                `${URLS.CURRENT_WEATHER}/${locationData.Key}?apikey=${AccuWeatherAPIKey}`
            );
            const currentWeatherData = currentWeatherResponse.data;
            const forecastResponse = await axios.get(
                `${URLS.FIVE_DAY_FORECAST}/${locationData.Key}?apikey=${AccuWeatherAPIKey}`
            );
            const forecastData = forecastResponse.data;
            return { locationData, currentWeatherData, forecastData };
        } catch (err) {
            errorHandler(err);
        }
    },
};
