import { useEffect, useState } from 'react';
import { ILocation } from '../Interfaces';

// NO LONGER IN USE DUE TO REPLACING CONTEXT WITH REDUX

export interface favoriteLocationsInterface {
    // key signature
    [key: string]: ILocation;
}

interface FavoriteLocationsHookResult extends Array<any> {
    0: favoriteLocationsInterface;
    1: (location: ILocation) => void;
    2: (locationKey: string) => void;
}

const useFavoriteLocations = (): FavoriteLocationsHookResult => {
    const [favoriteLocations, setFavoriteLocations] =
        useState<favoriteLocationsInterface>({});

    const saveFavoriteLocation = (location: ILocation) => {
        setFavoriteLocations((prevLocations) => {
            const updatedLocations = {
                ...prevLocations,
                [location.Key]: location,
            };
            localStorage.setItem('favorites', JSON.stringify(updatedLocations));
            return updatedLocations;
        });
    };

    const removeFavoriteLocation = (locationKey: string) => {
        setFavoriteLocations((prevLocations) => {
            const updatedLocations = { ...prevLocations };
            delete updatedLocations[locationKey];
            localStorage.setItem('favorites', JSON.stringify(updatedLocations));
            return updatedLocations;
        });
    };

    useEffect(() => {
        const storedFavorites: favoriteLocationsInterface =
            localStorage.getItem('favorites') !== null
                ? JSON.parse(localStorage.getItem('favorites') as string)
                : {};
        setFavoriteLocations(storedFavorites);
    }, []);

    return [favoriteLocations, saveFavoriteLocation, removeFavoriteLocation];
};

export default useFavoriteLocations;
