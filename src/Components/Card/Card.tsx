import React from 'react';
import './Card.css';
import { DailyForecast } from '../../Interfaces';

interface CardProps {
    forecast: DailyForecast;
}

const Card: React.FC<CardProps> = ({ forecast }) => {
    const date = new Date(forecast.Date);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
    return (
        <div className='component-wrapper card-wrapper flex column align-center'>
            <span>{dayOfWeek}</span>
            <span>
                {(forecast.Temperature.Minimum.Value +
                    forecast.Temperature.Maximum.Value) /
                    2}{' '}
                {forecast.Temperature.Maximum.Unit}
            </span>
            <span>{forecast.Day.IconPhrase}</span>
        </div>
    );
};

export default Card;
