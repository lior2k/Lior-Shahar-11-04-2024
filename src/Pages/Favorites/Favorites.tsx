import './Favorites.css';
import NavigationBar from '../../Components/NavigationBar/NavigationBar';
import FavoriteCard from '../../Components/FavoriteCard/FavoriteCard';
import { ILocation } from '../../Interfaces';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Store/Store';
import { setLocation } from '../../Features/Weather/WeatherSlice';

const Favorites = () => {
    const navigate = useNavigate();
    const favorites = useAppSelector((state) => state.favorites);
    const dispatch = useAppDispatch();

    const navigateHome = (location: ILocation) => {
        dispatch(setLocation(location));
        navigate('/');
    };

    return (
        <>
            <NavigationBar />

            <main>
                {Object.keys(favorites).length && (
                    <div
                        className='component-wrapper flex cards-wrapper main-content'
                        style={{ marginBlockStart: '105px' }}
                    >
                        {Object.keys(favorites).map(
                            (locationKey: string, index: number) => (
                                <FavoriteCard
                                    key={index}
                                    location={favorites[locationKey]}
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
