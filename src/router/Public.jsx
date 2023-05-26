import {Outlet,Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

function Public() {
    const {user} = useSelector(state => state.auth)
    if (!user) {
        return <Outlet/>
    }
    return <Navigate to="/"/>
}

export default Public