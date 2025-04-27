import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosHost } from '../http'

type authProps = {
    username?: string,
    email: string,
    password: string
}

export const RegistUser = createAsyncThunk<string, authProps>(
    'User/RegistUser',
    async function (registObj, {rejectWithValue}) {
        try {
            const {data} = await axiosHost.post('user/regist', registObj)
            localStorage.setItem('token', data.token)
            return data.token
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const LoginUser = createAsyncThunk<string, authProps>(
    'User/LoginUser',
    async function (loginObj, {rejectWithValue}) {
        try {
            const {data} = await axiosHost.post('user/login', loginObj)
            localStorage.setItem('token', data.token)
            return data.token
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export interface userStoreState {
    status: string
}

const initialState: userStoreState = {
    status: "",
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(LoginUser.fulfilled, (state) => {
            state.status = "success"
        })
        .addCase(RegistUser.fulfilled, (state) => {
            state.status = "success"
        })
    }
})

export default usersSlice.reducer