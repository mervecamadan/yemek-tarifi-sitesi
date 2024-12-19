import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteRecipe {
    id: number;
    name: string;
    image: string;
}

interface FavoritesState {
    favorites: FavoriteRecipe[];
}

const initialState: FavoritesState = {
    favorites: [],
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {

        addFavorite(state, action: PayloadAction<FavoriteRecipe>) {
            const existingFavorite = state.favorites.find(
                (recipe) => recipe.id === action.payload.id
            );
            if (!existingFavorite) {
                state.favorites.push(action.payload);
            }
        },

        removeFavorite(state, action: PayloadAction<number>) {
            state.favorites = state.favorites.filter(
                (recipe) => recipe.id !== action.payload
            );
        },

        toggleFavorite(state, action: PayloadAction<FavoriteRecipe>) {
            const existingFavorite = state.favorites.find(
                (recipe) => recipe.id === action.payload.id
            );
            if (existingFavorite) {
                state.favorites = state.favorites.filter(
                    (recipe) => recipe.id !== action.payload.id
                );
            } else {
                state.favorites.push(action.payload);
            }
        },
    },
});

export const { addFavorite, removeFavorite, toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;