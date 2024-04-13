import './Home.css';
import NavigationBar from '../../Components/NavigationBar/NavigationBar';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Card from '../../Components/Card/Card';

import { useWeather } from '../../Hooks/useWeather';

import { Icon } from '@iconify/react';
import { DailyForecast } from '../../Interfaces';

const Home = () => {
    const weather = useWeather();

    const dailyForecast = weather.forecast?.DailyForecasts[0];
    const minTemperature = dailyForecast?.Temperature.Minimum.Value;
    const maxTemperature = dailyForecast?.Temperature.Maximum.Value;
    const temperatureUnit = dailyForecast?.Temperature.Maximum.Unit;

    let averageTemperature;
    if (minTemperature && maxTemperature) {
        averageTemperature = (minTemperature + maxTemperature) / 2;
    }

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
                                <span>
                                    {averageTemperature} {temperatureUnit}
                                </span>
                            </div>
                        </div>
                        <div>
                            <span className='flex align-center'>
                                Save to Favorites
                                <Icon
                                    icon='mdi:heart-outline'
                                    className='icon'
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
