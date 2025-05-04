import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import  { DeviceProps } from './devicesSlice'
import { axiosHost } from '../http'

export type BasketProps = {
    id: number
    deviceId: number
    device: DeviceProps
}

export interface basketStoreState {
    Basket: BasketProps[],
    error: null | string | any
}

export const fetchBasket = createAsyncThunk<BasketProps[]>(
    'Basket/fetchBasket',
    async function (_, {rejectWithValue}) {
        try {
            const {data} = await axiosHost.get('/basket')
            return data.basket_item
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const addOneDevice = createAsyncThunk<DeviceProps, DeviceProps>(
    'Basket/addOneDevice',
    async function (device, {rejectWithValue}) {
        try {
            await axiosHost.post(`/basket?DeviceId=${device.id}`)
            return device
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const deleteDevice = createAsyncThunk<number, number>(
    'Basket/deleteDevice',
    async function (id) {
        await axiosHost.delete(`/basket?DeviceId=${id}`)
        return id
    }
)

const initialState: basketStoreState = {
    Basket: [],
    error: null
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchBasket.fulfilled, (state, action) => {
            state.Basket = action.payload
            state.error = 'fulfilled'
        })
        .addCase(deleteDevice.fulfilled, (state, action) => {
            state.Basket = state.Basket.filter(basket => basket.deviceId !== action.payload);
        })
        .addCase(addOneDevice.fulfilled, (state, action) => {
            const device = action.payload
            state.Basket.push({
                id: 0,
                deviceId: device.id,
                device: device
            })
            state.error = 'fulfilled'
        })
        .addCase(addOneDevice.rejected, (state, action) => {
            state.error = action.payload
            state.Basket = []
        })
    }
})

export default basketSlice.reducer