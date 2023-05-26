import Protected from './Protected.jsx'
import Public from './Public.jsx'
import SignIn from '../features/Auth/SignIn.jsx'
import SignUp from '../features/Auth/SignUp.jsx'
import Dashboard from '../features/Dashboard/Dashboard.jsx'
import Books from '../features/Books/Books.jsx'

const Routes = [
    {
        element: <Public/>,
        children: [
            {
                path: '/signup',
                element: <SignUp/>,
                name: 'Sign Up'
            },
            {
                path: '/signin',
                element: <SignIn/>,
                name: 'Sign In'
            }
        ]
    },
    {
        element: <Protected/>,
        children: [{
            path: '/',
            index: true,
            element: <Dashboard/>,
            name: 'Dashboard'
        },
            {
                path: '/mybooks',
                element: <Books/>,
                name: 'My Books'
            }
        ]
    },
    {
        path: '*',
        element: <h1>404</h1>,
        name: '404'
    }
]

export default Routes