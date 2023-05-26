import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import ShowToast from '../../components/Toast.jsx'
import Api from '../../config/api.js'

export const createUser = createAsyncThunk(
    'auth/createUser',
    async (inf, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/signup', inf)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (inf, {rejectWithValue}) => {
        inf && localStorage.setItem('userData', JSON.stringify(inf))
        try {
            const {data} = await Api.get('/myself')
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    })

const slice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null
    },
    reducers: {
        logout: (state) => {
            state.user = null
            localStorage.removeItem('userData')
        }
    },
    extraReducers: {
        [createUser.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [createUser.fulfilled]: (state, {payload: {data}}) => {
            state.loading = false
            state.user = data
            localStorage.setItem('userData', JSON.stringify(data))
        },
        [createUser.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
            ShowToast('error', payload)
        },
        [loginUser.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [loginUser.fulfilled]: (state, {payload: {data}}) => {
            state.loading = false
            state.user = data
            localStorage.setItem('userData', JSON.stringify(data))
            ShowToast('success', 'Login successful')
        },
        [loginUser.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
            state.user = null
            localStorage.removeItem('userData')
            ShowToast('error', payload)
        }
    }
})

export const {logout} = slice.actions
export default slice.reducer
