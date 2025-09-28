import { createStore, applyMiddleware } from "redux"
import thunk from 'redux-thunk';
import RootReducer from './magasin';
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['note'],
};

const persistedReducer = persistReducer<any, any>(persistConfig, RootReducer);

const store = configureStore({
    reducer: persistedReducer,
})

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch

export { store, persistor };