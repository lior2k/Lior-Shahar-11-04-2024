import './Home.css';
import NavigationBar from '../../Components/NavigationBar/NavigationBar';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Card from '../../Components/Card/Card';
import { Icon } from '@iconify/react';

import { useState, useEffect } from 'react';
import { useWeather } from '../../Hooks/useWeather';

import { DailyForecast } from '../../Interfaces';

const Home = () => {
    const weather = useWeather();
    const [isSaved, setIsSaved] = useState<boolean>(false);

    useEffect(() => {
        setIsSaved(
            weather.favoriteLocations.hasOwnProperty(
                weather.currentLocation?.Key as string
            )
        );
    }, [weather]);

    const handleFavoritesToggle = () => {
        if (!weather.currentLocation) return;
        if (isSaved) {
            weather.removeFavoriteLocation(weather.currentLocation.Key);
        } else {
            weather.saveFavoriteLocation(weather.currentLocation);
        }
        setIsSaved(!isSaved);
    };

    return (
        <div className='page-wrapper'>
            <NavigationBar />

            <main>
                <SearchBar />
                <div className='component-wrapper main-content'>
                    <div className='top-section component-wrapper flex'>
                        <div className='flex'>
                            <Icon icon='mdi:weather-cloudy' className='icon' />
                            <div className='flex column'>
                                <span>
                                    {weather.currentLocation?.LocalizedName}
                                </span>
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
                            <span className='flex align-center'>
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
