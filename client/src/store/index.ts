import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { 
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import filtersReducer from "./filtersSlice"
import devicesReducer from './devicesSlice'
import basketReducer from './basketSlice'
import userReducer from './usersSlice'

const rootReducer = combineReducers({
  filters: filtersReducer,
  devices: devicesReducer,
  basket: basketReducer,
  user: userReducer
})

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ['basket']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch