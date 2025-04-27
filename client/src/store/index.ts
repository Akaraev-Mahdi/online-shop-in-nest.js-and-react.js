import { configureStore } from '@reduxjs/toolkit'
import filtersReducer from "./filtersSlice"
import devicesReducer from './devicesSlice'
import basketReducer from './basketSlice'
import userReducer from './usersSlice'

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    devices: devicesReducer,
    basket: basketReducer,
    user: userReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch