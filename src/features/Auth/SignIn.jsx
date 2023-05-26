import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import {useDispatch, useSelector} from 'react-redux'
import {loginUser} from './AuthSlice.js'
import Loader from '../../components/Loader.jsx'
import Grid from '@mui/material/Grid'
import {Link} from 'react-router-dom'

export default function SignIn() {
    const {loading} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = (() => {
            const {secret, key} = e.target.elements
            return {
                secret: secret.value,
                key: key.value
            }
        })()
        dispatch(loginUser(data))
    }

    return (
        <Container component="main" maxWidth="xs">
            {loading && <Loader/>}
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="Secret"
                        label="Secret"
                        name="secret"
                        autoComplete="secret"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="key"
                        label="Key"
                        type="password"
                        id="Key"
                        autoComplete="key"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/signup">
                                {'Don\'t have an account? Sign Up'}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}