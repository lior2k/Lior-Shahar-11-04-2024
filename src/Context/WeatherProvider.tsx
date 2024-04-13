import React, { createContext, useState, useEffect } from 'react';
import { Location, CurrentWeather, Forecast } from '../Interfaces';
import axios from 'axios';
import { URLS, AccuWeatherAPIKey } from '../Constants/Constants';
import { errorHandler } from '../Handlers/ErrorHandler';

import telAvivLocationExample from '../Constants/TelAvivLocationExample.json';
import currentWeatherExample from '../Constants/CurrentWeatherExample.json';
import exampleForecast from '../Constants/FiveDayForecastExample.json';

export type WeatherProps = {
    forecast: Forecast;
    setForecast: React.Dispatch<React.SetStateAction<Forecast>>;
    currentWeather: CurrentWeather | null;
    setCurrentWeather: React.Dispatch<
        React.SetStateAction<CurrentWeather | null>
    >;
    currentLocation: Location | null;
    setCurrentLocation: React.Dispatch<React.SetStateAction<Location | null>>;
    // favorites ?
};

export const WeatherContext = createContext({} as WeatherProps);

type WeatherProviderProps = {
    children: React.ReactNode;
};

const WeatherProvider = ({ children }: WeatherProviderProps) => {
    const [currentLocation, setCurrentLocation] = useState<Location | null>(
        null
    );
    const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(
        null
    );
    const [forecast, setForecast] = useState<Forecast>(exampleForecast);

    useEffect(() => {
        const fetchTelAviv = async () => {
            try {
                // fetch tel aviv as default location and get the key to query tel aviv's current weather and forecast
                // const locationResponse = await axios.get(
                //     `${URLS.LOCATION_AUTO_COMPLETE}?apikey=${AccuWeatherAPIKey}&q=215854`
                // );
                // const locationData = response.data;
                // setCurrentLocation(locationData);
                setCurrentLocation(telAvivLocationExample);

                // use tel aviv's key to query and set the current weather
                // const weatherResponse = await axios.get(`${URLS.CURRENT_WEATHER}/${locationData.key}`);
                // setCurrentWeather(weatherResponse.data);
                setCurrentWeather(currentWeatherExample);

                // use tel aviv's key to query and set the forecast
                // const forecastResponse = await axios.get(
                //     `${URLS.FIVE_DAY_FORECAST}/${telAvivLocationExample.Key}`
                // );
                // setForecast(forecastResponse.data);
                setForecast(exampleForecast);
            } catch (err) {
                errorHandler(err);
            }
        };

        fetchTelAviv();
    }, []);

    return (
        <WeatherContext.Provider
            value={{
                forecast,
                setForecast,
                currentWeather,
                setCurrentWeather,
                currentLocation,
                setCurrentLocation,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
};

export default WeatherProvider;
