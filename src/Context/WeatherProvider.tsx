import React, { createContext, useState, useEffect } from 'react';
import { Location, CurrentWeather, Forecast } from '../Interfaces';
import { WeatherService } from '../Services/WeatherService';

export type WeatherProps = {
    forecast: Forecast | null;
    setForecast: React.Dispatch<React.SetStateAction<Forecast | null>>;
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
    const [forecast, setForecast] = useState<Forecast | null>(null);

    useEffect(() => {
        const setData = async () => {
            const data = await WeatherService.fetchTelAviv();
            if (!data) {
                return;
            }
            setCurrentLocation(data.locationData);
            setCurrentWeather(data.currentWeatherData);
            setForecast(data.forecastData);
        };

        setData();
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
