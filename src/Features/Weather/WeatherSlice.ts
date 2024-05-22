import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ILocation, ICurrentWeather, IForecast } from '../../Interfaces';

interface WeatherState {
    location: ILocation | null;
    currentWeather: ICurrentWeather | null;
    forecast: IForecast | null;
}

const initialState: WeatherState = {
    location: null,
    currentWeather: null,
    forecast: null,
};

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: initialState,
    reducers: {
        setLocation: (state, action: PayloadAction<ILocation>) => {
            state.location = action.payload;
        },
        setCurrentWeather: (state, action: PayloadAction<ICurrentWeather>) => {
            state.currentWeather = action.payload;
        },
        setForecast: (state, action: PayloadAction<IForecast>) => {
            state.forecast = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setLocation, setCurrentWeather, setForecast } =
    weatherSlice.actions;

export default weatherSlice.reducer;
