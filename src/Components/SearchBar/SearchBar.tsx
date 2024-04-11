import React, { useState } from 'react';
import './SearchBar.css';
import { Icon } from '@iconify/react';

const SearchBar = () => {
    const [searchParam, setSearchParam] = useState<string>('');

    return (
        <div className='search-bar-wrapper'>
            <div className='input-wrapper'>
                <input
                    required
                    placeholder='Search Location'
                    value={searchParam}
                    onChange={(e) => setSearchParam(e.target.value)}
                    className='search-bar-input'
                ></input>

                <Icon icon='mdi:search' className='search-icon'></Icon>
            </div>
        </div>
    );
};

export default SearchBar;
