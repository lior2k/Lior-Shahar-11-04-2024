import React, { createContext, useState, useEffect } from 'react';
import useFavoriteLocations from '../Hooks/useFavoriteLocations';
import { ILocation, ICurrentWeather, IForecast } from '../Interfaces';
import { WeatherService } from '../Services/WeatherService';

export type WeatherProps = {
    forecast: IForecast | null;
    setForecast: React.Dispatch<React.SetStateAction<IForecast | null>>;
    currentWeather: ICurrentWeather | null;
    setCurrentWeather: React.Dispatch<
        React.SetStateAction<ICurrentWeather | null>
    >;
    currentLocation: ILocation | null;
    setCurrentLocation: React.Dispatch<React.SetStateAction<ILocation | null>>;

    favoriteLocations: { [key: string]: ILocation };
    saveFavoriteLocation: (location: ILocation) => void;
    removeFavoriteLocation: (locationKey: string) => void;
};

export const WeatherContext = createContext({} as WeatherProps);

type WeatherProviderProps = {
    children: React.ReactNode;
};

const WeatherProvider = ({ children }: WeatherProviderProps) => {
    const [currentLocation, setCurrentLocation] = useState<ILocation | null>(
        null
    );
    const [currentWeather, setCurrentWeather] =
        useState<ICurrentWeather | null>(null);
    const [forecast, setForecast] = useState<IForecast | null>(null);
    const [favoriteLocations, saveFavoriteLocation, removeFavoriteLocation] =
        useFavoriteLocations();

    useEffect(() => {
        const setData = async () => {
            // on initial app launch fetch tel aviv by default and set it as current location
            let data;
            if (currentLocation === null) {
                data = await WeatherService.fetchTelAviv();
                if (data) setCurrentLocation(data.locationData);
            }
            // on navigation from favorite page - fetch the weather and forecast of the chosen location
            else {
                data = await WeatherService.fetchWeatherAndForecast([
                    currentLocation,
                ]);
            }
            if (!data) return;
            setCurrentWeather(data.currentWeatherData[0]);
            setForecast(data.forecastData);
        };

        setData();
    }, [currentLocation]);

    return (
        <WeatherContext.Provider
            value={{
                forecast,
                setForecast,
                currentWeather,
                setCurrentWeather,
                currentLocation,
                setCurrentLocation,

                favoriteLocations,
                saveFavoriteLocation,
                removeFavoriteLocation,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
};

export default WeatherProvider;
