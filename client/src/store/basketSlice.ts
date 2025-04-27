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

export const addOneDevice = createAsyncThunk<number, number>(
    'Basket/addOneDevice',
    async function (id, {rejectWithValue}) {
        try {
            await axiosHost.post(`/basket?DeviceId=${id}`)
            return id
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
        })
        .addCase(deleteDevice.fulfilled, (state, action) => {
            state.Basket = state.Basket.filter(basket => basket.deviceId !== action.payload);
        })
        .addCase(addOneDevice.fulfilled, (state, action) => {
            state.Basket.push({
                id: 0,
                deviceId: action.payload,
                device: {
                    id: 0,
                    name: '',
                    img: '',
                    price: 0,
                    brand: {
                        id: 0,
                        name: ''
                    },
                    device_info: []
                }
            })
        })
        .addCase(addOneDevice.rejected, (state, action) => {
            state.error = action.payload
        })
    }
})

export default basketSlice.reducer