import './Favorites.css';
import NavigationBar from '../../Components/NavigationBar/NavigationBar';
import FavoriteCard from '../../Components/FavoriteCard/FavoriteCard';
import { ILocation } from '../../Interfaces';
import { useNavigate } from 'react-router-dom';
import { useWeather } from '../../Hooks/useWeather';

const Favorites = () => {
    const weather = useWeather();
    const navigate = useNavigate();

    const navigateHome = (location: ILocation) => {
        weather.setCurrentLocation(location);
        navigate('/');
    };

    return (
        <>
            <NavigationBar />

            <main>
                {Object.keys(weather.favoriteLocations).length && (
                    <div
                        className='component-wrapper flex cards-wrapper main-content'
                        style={{ marginBlockStart: '105px' }}
                    >
                        {Object.keys(weather.favoriteLocations).map(
                            (locationKey: string, index: number) => (
                                <FavoriteCard
                                    key={index}
                                    location={
                                        weather.favoriteLocations[locationKey]
                                    }
                                    callback={(location: ILocation) =>
                                        navigateHome(location)
                                    }
                                />
                            )
                        )}
                    </div>
                )}
            </main>
        </>
    );
};

export default Favorites;
