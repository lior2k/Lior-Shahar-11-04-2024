import { configureStore } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import favoritesReducer from '../Features/Favorites/FavoritesSlice';
import weatherReducer from '../Features/Weather/WeatherSlice';

export const store = configureStore({
    reducer: { favorites: favoritesReducer, weather: weatherReducer },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
    ReturnType<typeof store.getState>
> = useSelector;
