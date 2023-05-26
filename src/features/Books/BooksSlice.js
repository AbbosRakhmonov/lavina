import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import Api from '../../config/api.js'
import ShowToast from '../../components/Toast.jsx'
import {map} from 'lodash'

export const addBook = createAsyncThunk(
    'books/addBook',
    async (inf, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/books', inf)
            return data
        } catch (e) {
            return rejectWithValue(e)
        }
    })

export const getMyBooks = createAsyncThunk(
    'books/getMyBooks',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await Api.get('/books')
            return data
        } catch (e) {
            return rejectWithValue(e)
        }
    })

export const deleteBook = createAsyncThunk(
    'books/deleteBook',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await Api.delete(`/books/${id}`)
            return data
        } catch (e) {
            return rejectWithValue(e)
        }
    })

export const updateBook = createAsyncThunk(
    'books/updateBook',
    async (inf, {rejectWithValue}) => {
        try {
            const {data} = await Api.patch(`/books/${inf.id}`, {
                status: inf.status
            })
            return data
        } catch (e) {
            return rejectWithValue(e)
        }
    })

const slice = createSlice({
    name: 'books',
    initialState: {
        loading: false,
        error: null,
        data: []
    },
    extraReducers: {
        [getMyBooks.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getMyBooks.fulfilled]: (state, {payload: {data}}) => {
            state.loading = false
            state.error = null
            state.data = data
        },
        [getMyBooks.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
            ShowToast('error', payload)
        },
        [addBook.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [addBook.fulfilled]: (state, {payload: {data}}) => {
            state.loading = false
            state.error = null
            ShowToast('success', `Book ${data.title} added successfully`)
        },
        [addBook.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
            ShowToast('error', payload)
        },
        [deleteBook.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [deleteBook.fulfilled]: (state, {payload: {data}}) => {
            state.loading = false
            state.error = null
            state.data = data
        },
        [deleteBook.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
            ShowToast('error', payload)
        },
        [updateBook.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [updateBook.fulfilled]: (state, {payload: {data}}) => {
            state.loading = false
            state.error = null
            state.data = map(state.data, (obj) => obj.book.id === data.book.id ? data : obj)
        },
        [updateBook.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
            ShowToast('error', payload)
        }
    }
})

export default slice.reducer