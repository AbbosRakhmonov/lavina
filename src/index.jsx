import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter as Router} from 'react-router-dom'
import Store from './app/store.js'
import {Provider} from 'react-redux'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <ToastContainer/>
        <Router>
            <Provider store={Store}>
                <App/>
            </Provider>
        </Router>
    </>
)
