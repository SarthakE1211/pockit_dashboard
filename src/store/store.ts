import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { UserState } from "./slices/userSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage"; // localStorage

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    user: userReducer,
});

export interface RootState {
    user: UserState;
}

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;