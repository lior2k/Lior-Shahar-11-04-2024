import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import axios from 'axios';
import { AccuWeatherAPIKey, URLS } from '../../Constants/Constants';
import exampleData from '../../Constants/AutoCompleteResponseExample.json';
import { Location } from '../../Interfaces';
import { errorHandler } from '../../Handlers/ErrorHandler';

const SearchBar = () => {
    const [searchParam, setSearchParam] = useState<string>('');
    const [locations, setLocations] = useState<Location[]>([]);

    useEffect(() => {
        const fetchLocations = async () => {
            if (searchParam === '') {
                return;
            }
            try {
                // const response = await axios.get(
                //     `${URLS.LOCATION_AUTO_COMPLETE}?apikey=${AccuWeatherAPIKey}&q=${searchParam}`
                // );

                // setLocations((previousLocations) => [...response.data]);
                setLocations((previousLocations) => [...exampleData]);
            } catch (err) {
                errorHandler(err);
            }
        };

        fetchLocations();
    }, [searchParam]);

    return (
        <div className='component-wrapper'>
            <input
                required
                placeholder='Search Location &#x1F50E;'
                value={searchParam}
                onChange={(e) => setSearchParam(e.target.value)}
                className='search-bar-input'
                list='locations'
                lang='en'
                pattern='[A-Za-z\s]*'
            ></input>
            <datalist id='locations'>
                {locations.map((location: Location, index: number) => {
                    const value =
                        location.LocalizedName +
                        ' ' +
                        location.Country.LocalizedName;
                    return (
                        <option value={value} key={index}>
                            {value}
                        </option>
                    );
                })}
            </datalist>
        </div>
    );
};

export default SearchBar;
