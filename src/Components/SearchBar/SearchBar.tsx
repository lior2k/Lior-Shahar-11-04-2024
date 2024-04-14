import { useState, useEffect } from 'react';
import './SearchBar.css';
import { ILocation } from '../../Interfaces';
import { WeatherService } from '../../Services/WeatherService';
import { useWeather } from '../../Hooks/useWeather';

const SearchBar = () => {
    const [searchParam, setSearchParam] = useState<string>('');
    const [locations, setLocations] = useState<ILocation[]>([]);
    const weather = useWeather();

    useEffect(() => {
        WeatherService.fetchAutoComplete(searchParam, setLocations);
    }, [searchParam]);

    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = await WeatherService.fetchWeatherAndForecast(locations);
        if (!data) return;
        weather.setCurrentLocation(data.locationData);
        weather.setCurrentWeather(data.currentWeatherData[0]);
        weather.setForecast(data.forecastData);
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
