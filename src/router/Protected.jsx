import {Navigate, Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Layout from '../features/layout.jsx'

function Protected() {
    const {user} = useSelector(state => state.auth)
    const userData = JSON.parse(localStorage.getItem('userData'))
    if (user || userData) {
        return <Layout>
            <Outlet/>
        </Layout>
    }
    return <Navigate to="/signin"/>
}

export default Protected