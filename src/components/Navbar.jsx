import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import {useState} from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../features/Auth/AuthSlice.js'


function Navbar() {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    const [anchorEl, setAnchorEl] = useState(null)

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        dispatch(logout())
        setAnchorEl(null)
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Navbar
                </Typography>
                <Box sx={{display: {xs: 'none', sm: 'block'}, mr: 1}}>
                    {/* nav links */}
                    <Button component={Link} to={'/'} color={'inherit'}>All Books</Button>
                    <Button component={Link} to={'/mybooks'} color={'inherit'}>My Books</Button>
                </Box>
                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle/>
                        <Typography sx={{ml: 1}}>{user?.name}</Typography>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleLogout}>Log out</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar