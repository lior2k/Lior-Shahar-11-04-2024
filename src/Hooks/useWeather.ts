import { useContext } from 'react';
import { WeatherContext, WeatherProps } from '../Context/WeatherProvider';

export const useWeather = (): WeatherProps => {
    return useContext(WeatherContext);
};
