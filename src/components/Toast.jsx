import {toast} from 'react-toastify'

const errorToast = (message) => toast(message, {
    type: 'error',
    position: 'top-right',
    theme: 'colored',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
})

const successToast = (message) => toast(message, {
    type: 'success',
    position: 'top-right',
    theme: 'colored',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
})

const ShowToast = (type, message) => {
    if (type === 'error') {
        errorToast(message)
    } else if (type === 'success') {
        successToast(message)
    }
}

export default ShowToast