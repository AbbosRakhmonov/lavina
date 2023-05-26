import {configureStore} from '@reduxjs/toolkit'
import AuthSlice from '../features/Auth/AuthSlice.js'
import DashboardSlice from '../features/Dashboard/DashboardSlice.js'
import BooksSlice from '../features/Books/BooksSlice.js'

export default configureStore({
    reducer: {
        auth: AuthSlice,
        dashboard: DashboardSlice,
        books: BooksSlice
    }
})

