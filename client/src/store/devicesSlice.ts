import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import  { FiltersProps, ChangeFilterProps } from './filtersSlice'
import { axiosHost } from '../http'

type deviceInfoProps = {
    id: number,
    title: string,
    description: string
}

export type DeviceProps = {
    id: number,
    name: string,
    img: string,
    price: number,
    brand: FiltersProps,
    type: FiltersProps,
    device_info: deviceInfoProps[]
}

type rowsProps = {
    count: number,
    rows: DeviceProps[]
}

export interface devicesStoreState {
    Devices: DeviceProps[],
    Device: DeviceProps
    DeviceCount: number
}

export const fetchDevice = createAsyncThunk<rowsProps, ChangeFilterProps>(
    'Device/fetchDevice',
    async function (filter) {
        const {data} = await axiosHost.get('/device', 
        {params: {
            limit: 2,
            page: filter.page, 
            typeId: filter.typeId, 
            brandId: filter.brandId
        }})
        return data
    }
)

export const fetchOneDevice = createAsyncThunk<DeviceProps, string>(
    'Device/fetchOneDevice',
    async function (id) {
        const {data} = await axiosHost.get('/device/' + id)
        return data
    }
)

const initialState: devicesStoreState = {
    Devices: [],
    Device: {
        id: 0,
        name: '',
        img: '',
        price: 0,
        brand: {
            id: 0,
            name: ''
        },
        type: {
            id: 0,
            name: ''
        },
        device_info: []
    },
    DeviceCount: 0
}

export const devicesSlice = createSlice({
    name: 'devices',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchDevice.fulfilled, (state, action) => {
            const data = action.payload
            state.Devices = data.rows
            state.DeviceCount = data.count
        })
        .addCase(fetchOneDevice.fulfilled, (state, action) => {
            state.Device = action.payload
        })
    }
})

export default devicesSlice.reducer