import {Navigate, Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'

function Protected() {
    const {user} = useSelector(state => state.auth)
    const userData = JSON.parse(localStorage.getItem('userData'))
    if (user || userData) {
        return <Outlet/>
    }
    return <Navigate to="/signin"/>
}

export default Protected