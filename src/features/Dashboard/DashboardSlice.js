import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import Api from '../../config/api.js'
import ShowToast from '../../components/Toast.jsx'

export const getBooks = createAsyncThunk(
    'dashboard/getBooks',
    async (inf, {rejectWithValue}) => {
        try {
            const {data} = await Api.get(`/books/${inf || ':title'}`)
            return data
        } catch (e) {
            return rejectWithValue(e)
        }
    })


const slice = createSlice({
    name: 'dashboard',
    initialState: {
        loading: false,
        error: null,
        data: []
    },
    extraReducers: {
        [getBooks.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getBooks.fulfilled]: (state, {payload: {data}}) => {
            state.loading = false
            state.data = data
        },
        [getBooks.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
            ShowToast('error', payload)
        }
    }
})

export default slice.reducer