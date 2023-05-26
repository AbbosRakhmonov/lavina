import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {loginUser} from './features/Auth/AuthSlice.js'
import {useRoutes} from 'react-router-dom'
import Routes from './router/Routes.jsx'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        if (userData) {
            dispatch(loginUser())
        }
    }, [dispatch])
    return useRoutes(Routes)
}

export default App
