import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ILocation } from '../../Interfaces';

export interface favoriteLocationsInterface {
    // key signature
    [key: string]: ILocation;
}

const storedFavorites = localStorage.getItem('favorites');
const initialState: favoriteLocationsInterface =
    storedFavorites !== null ? JSON.parse(storedFavorites) : {};

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: initialState,
    reducers: {
        saveFavoriteLocation: (state, action: PayloadAction<ILocation>) => {
            state[action.payload.Key] = action.payload;
            localStorage.setItem('favorites', JSON.stringify(state));
        },
        removeFavoriteLocation: (state, action: PayloadAction<string>) => {
            delete state[action.payload];
            localStorage.setItem('favorites', JSON.stringify(state));
        },
    },
});

// Action creators are generated for each case reducer function
export const { saveFavoriteLocation, removeFavoriteLocation } =
    favoritesSlice.actions;

export default favoritesSlice.reducer;
