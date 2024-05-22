import './Home.css';
import NavigationBar from '../../Components/NavigationBar/NavigationBar';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Card from '../../Components/Card/Card';
import { Icon } from '@iconify/react';
import { DailyForecast } from '../../Interfaces';

import { useState, useEffect } from 'react';
import { WeatherService } from '../../Services/WeatherService';
import {
    saveFavoriteLocation,
    removeFavoriteLocation,
} from '../../Features/Favorites/FavoritesSlice';
import {
    setLocation,
    setCurrentWeather,
    setForecast,
} from '../../Features/Weather/WeatherSlice';
import { useAppSelector, useAppDispatch } from '../../Store/Store';

const Home = () => {
    const [isSaved, setIsSaved] = useState<boolean>(false);

    const favorites = useAppSelector((state) => state.favorites);
    const weather = useAppSelector((state) => state.weather);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const setInitialValues = async () => {
            const locationData = await WeatherService.fetchAutoComplete(
                'Tel Aviv'
            );
            if (!locationData) return;
            dispatch(setLocation(locationData[0]));
            const weatherData = await WeatherService.fetchWeatherAndForecast([
                locationData[0],
            ]);
            if (!weatherData) return;
            dispatch(setCurrentWeather(weatherData.currentWeatherData[0]));
            dispatch(setForecast(weatherData.forecastData));
        };

        setInitialValues();
    });

    useEffect(() => {
        if (!weather.location) return;
        setIsSaved(favorites.hasOwnProperty(weather.location.Key));
    }, [favorites, weather]);

    const handleFavoritesToggle = () => {
        if (!weather.location) return;
        if (isSaved) {
            dispatch(removeFavoriteLocation(weather.location.Key));
        } else {
            dispatch(saveFavoriteLocation(weather.location));
        }
        setIsSaved(!isSaved);
    };

    return (
        <div className='page-wrapper'>
            <NavigationBar />

            <main>
                <SearchBar />
                <div className='main-content'>
                    <div className='top-section component-wrapper flex'>
                        <div className='flex mobile-to-column'>
                            <Icon icon='mdi:weather-cloudy' className='icon' />
                            <div className='flex column'>
                                <span>{weather.location?.LocalizedName}</span>
                                {weather.currentWeather &&
                                    weather.currentWeather.Temperature && (
                                        <span>
                                            {weather.currentWeather.Temperature
                                                .Metric.Value +
                                                ' ' +
                                                weather.currentWeather
                                                    .Temperature.Metric.Unit}
                                        </span>
                                    )}
                            </div>
                        </div>
                        <div
                            className='text-glow'
                            onClick={() => handleFavoritesToggle()}
                        >
                            <span className='flex align-center mobile-to-column'>
                                {isSaved
                                    ? 'Remove from Favorites'
                                    : 'Save to Favorites'}
                                <Icon
                                    icon={
                                        isSaved
                                            ? 'mdi:heart'
                                            : 'mdi:heart-outline'
                                    }
                                    className='icon pulse'
                                />
                            </span>
                        </div>
                    </div>

                    <div className='component-wrapper'>
                        <h1 style={{ textAlign: 'center' }}>
                            {weather.forecast?.Headline.Text}
                        </h1>
                    </div>

                    <div className='component-wrapper flex cards-wrapper'>
                        {weather.forecast?.DailyForecasts.map(
                            (dailyForecast: DailyForecast, index: number) => (
                                <Card forecast={dailyForecast} key={index} />
                            )
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
