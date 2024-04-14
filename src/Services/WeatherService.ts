import { errorHandler } from '../Handlers/ErrorHandler';
import { ILocation, ICurrentWeather, IForecast } from '../Interfaces';
import axios from 'axios';
import { URLS, AccuWeatherAPIKey } from '../Constants/Constants';
import { toast } from 'react-toastify';

export type WeatherData = {
    locationData: ILocation;
    currentWeatherData: ICurrentWeather[];
    forecastData: IForecast;
};

export const WeatherService = {
    fetchTelAviv: async (): Promise<WeatherData | undefined> => {
        try {
            // fetch tel aviv as default location and get the key to query tel aviv's current weather and forecast
            const locationResponse = await axios.get(
                `${URLS.LOCATION_AUTO_COMPLETE}?apikey=${AccuWeatherAPIKey}&q=Tel%20Aviv`
            );
            const locationData = locationResponse.data[0];

            // use tel aviv's key to query and set the current weather
            const weatherResponse = await axios.get(
                `${URLS.CURRENT_WEATHER}/${locationData.Key}?apikey=${AccuWeatherAPIKey}`
            );
            const currentWeatherData = weatherResponse.data;

            // use tel aviv's key to query and set the forecast
            const forecastResponse = await axios.get(
                `${URLS.FIVE_DAY_FORECAST}/${locationData.Key}?apikey=${AccuWeatherAPIKey}`
            );
            const forecastData = forecastResponse.data;

            return { locationData, currentWeatherData, forecastData };
        } catch (err) {
            errorHandler(err);
        }
    },

    fetchAutoComplete: async (
        searchParam: string,
        setLocations: React.Dispatch<React.SetStateAction<ILocation[]>>
    ): Promise<ILocation[] | undefined> => {
        if (searchParam === '') {
            return;
        }
        try {
            const response = await axios.get(
                `${URLS.LOCATION_AUTO_COMPLETE}?apikey=${AccuWeatherAPIKey}&q=${searchParam}`
            );
            setLocations((previousLocations) => [...response.data]);
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