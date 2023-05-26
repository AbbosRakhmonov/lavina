import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import {useCallback, useEffect} from 'react'
import {debounce, map, uniqueId} from 'lodash'
import {useDispatch, useSelector} from 'react-redux'
import {getBooks} from './DashboardSlice.js'
import Loader from '../../components/Loader.jsx'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Book from '../../components/Book.jsx'

function Dashboard() {
    const {data, loading: loaderDashboard} = useSelector(state => state.dashboard)
    const {loading: loaderBook} = useSelector(state => state.books)
    const dispatch = useDispatch()

    const handleSearch = useCallback(debounce((title) => {
        dispatch(getBooks(title))
    }, 1000), [])
    const handleSubmit = (e) => {
        e.preventDefault()
        const {value} = e.target.elements.title
        handleSearch(value.trim())
    }
    const onInputChange = (e) => {
        const {value} = e.target
        handleSearch(value.trim())
    }

    useEffect(() => {
        dispatch(getBooks())
    }, [dispatch])
    return (
        <Box component={'section'}>
            {(loaderDashboard || loaderBook) && <Loader/>}
            <Typography variant={'h4'} align={'center'} sx={{
                mt: 2,
                mb: 5,
                color: 'primary.main',
                textTransform: 'uppercase',
                letterSpacing: 2
            }}>
                All Books
            </Typography>
            <Paper
                component="form"
                onSubmit={handleSubmit}
                sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, margin: '0 auto'}}
            >
                <InputBase
                    sx={{ml: 1, flex: 1}}
                    name={'title'}
                    onChange={onInputChange}
                    placeholder="Write book title or id"
                    inputProps={{'aria-label': 'search google maps'}}
                />
                <IconButton type="submit" sx={{p: '10px'}} aria-label="search">
                    <SearchIcon/>
                </IconButton>
            </Paper>
            <Container sx={{py: 8}}>
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {map(data, (book) => <Book key={uniqueId('book_')} book={book}/>)}
                </Grid>
            </Container>
        </Box>
    )
}

export default Dashboard