import React, { useState, useEffect } from 'react';
import './FavoriteCard.css';
import { ICurrentWeather, ILocation } from '../../Interfaces';
import { WeatherService } from '../../Services/WeatherService';

interface FavoriteCardInterface {
    location: ILocation;
    callback: (location: ILocation) => void;
}

const FavoriteCard: React.FC<FavoriteCardInterface> = ({
    location,
    callback,
}) => {
    const [currentWeather, setCurrentWeather] = useState<ICurrentWeather>();

    useEffect(() => {
        const getCurrentWeather = async () => {
            const weather = await WeatherService.fetchWeather(location);
            if (weather) setCurrentWeather(weather[0]);
        };

        getCurrentWeather();
    }, [location]);

    return (
        <div
            className='component-wrapper card-wrapper flex column align-center glow'
            onClick={() => callback(location)}
        >
            <span>{location.LocalizedName}</span>
            <span>{location.Country.LocalizedName}</span>
            {currentWeather && (
                <>
                    <span>
                        {currentWeather?.Temperature?.Metric.Value +
                            ' ' +
                            currentWeather?.Temperature?.Metric.Unit}
                    </span>
                    <span>{currentWeather?.WeatherText}</span>
                </>
            )}
        </div>
    );
};

export default FavoriteCard;
