import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import companyReducer from './companySlice';
import jobReducer from './jobSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

// Combine your reducers
const rootReducer = combineReducers({
  auth: authReducer,
  job: jobReducer,
  company: companyReducer,
});

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
