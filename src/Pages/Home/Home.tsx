import React from 'react';
import './Home.css';
import NavigationBar from '../../Components/NavigationBar/NavigationBar';
import SearchBar from '../../Components/SearchBar/SearchBar';

const Home = () => {
    return (
        <div className='page-wrapper'>
            <NavigationBar />
            <SearchBar />
        </div>
    );
};

export default Home;
