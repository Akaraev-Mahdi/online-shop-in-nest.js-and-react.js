import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosHost } from '../http'

export type FiltersProps = {
    id: number,
    name: string
}

export type ChangeFilterProps = {
    typeId: number | string,
    brandId: number | string,
    page: number
}

type checkedFilterProps = {
    type: number | string,
    brand: number | string
}

export interface typesStoreState {
    Filters: {
        type: FiltersProps[],
        brand: FiltersProps[]
    }
    Filter: ChangeFilterProps,
    checkedFilter: checkedFilterProps,
    status: string
}

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    async function () {
        const type = await axiosHost.get('/type')
        const brand = await axiosHost.get('/brand')
        const filters = {
            type: type.data,
            brand: brand.data
        }
        return filters
    }
)

const initialState: typesStoreState = {
    Filters: {
        type: [],
        brand: []
    },
    Filter: {
        typeId: '',
        brandId: '',
        page: 1
    },
    checkedFilter: {
        type: '',
        brand: ''
    },
    status: ''
}

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        changeFilter: (state, action) => {
            let filter: ChangeFilterProps = action.payload
            state.Filter = filter

            state.checkedFilter.type = filter.typeId
            state.checkedFilter.brand = filter.brandId
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchFilters.fulfilled, (state, action) => {
            state.Filters = action.payload
            state.status = 'fulfilled'
        })
        .addCase(fetchFilters.pending, (state) => {
            state.status = 'loading' 
        })
    }
})

export const { changeFilter } = filtersSlice.actions
export default filtersSlice.reducer