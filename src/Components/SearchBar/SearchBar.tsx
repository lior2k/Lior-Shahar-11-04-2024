import { useState, useEffect } from 'react';
import './SearchBar.css';
import { ILocation } from '../../Interfaces';
import { WeatherService } from '../../Services/WeatherService';
import {
    setLocation,
    setCurrentWeather,
    setForecast,
} from '../../Features/Weather/WeatherSlice';
import { useAppDispatch } from '../../Store/Store';

const SearchBar = () => {
    const [searchParam, setSearchParam] = useState<string>('');
    const [locations, setLocations] = useState<ILocation[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchLocationsList = async () => {
            const locationsList = await WeatherService.fetchAutoComplete(
                searchParam
            );
            if (locationsList) setLocations(locationsList);
        };

        fetchLocationsList();
    }, [searchParam]);

    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const weatherServiceResponse =
            await WeatherService.fetchWeatherAndForecast(locations);
        if (!weatherServiceResponse) return;
        dispatch(setLocation(weatherServiceResponse.locationData));
        dispatch(
            setCurrentWeather(weatherServiceResponse.currentWeatherData[0])
        );
        dispatch(setForecast(weatherServiceResponse.forecastData));
    };

    return (
        <div className='component-wrapper'>
            <form onSubmit={(e) => handleSearch(e)}>
                <input
                    required
                    placeholder='Search Location &#x1F50E;'
                    value={searchParam}
                    onChange={(e) => setSearchParam(e.target.value)}
                    className='search-bar-input'
                    list='locations'
                    lang='en'
                    pattern="[A-Za-z\s,.']*"
                ></input>
                <datalist id='locations'>
                    {locations.map((location: ILocation, index: number) => {
                        const value =
                            location.LocalizedName +
                            ',' +
                            location.Country.LocalizedName +
                            ',' +
                            location.AdministrativeArea.LocalizedName;
                        return (
                            <option value={value} key={index}>
                                {value}
                            </option>
                        );
                    })}
                </datalist>
            </form>
        </div>
    );
};

export default SearchBar;
