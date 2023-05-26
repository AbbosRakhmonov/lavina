import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import {map, uniqueId} from 'lodash'
import Book from '../../components/Book.jsx'
import Container from '@mui/material/Container'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {getMyBooks} from './BooksSlice.js'
import Loader from '../../components/Loader.jsx'

function Books() {
    const dispatch = useDispatch()
    const {data, loading} = useSelector(state => state.books)

    useEffect(() => {
        dispatch(getMyBooks())
    }, [dispatch])

    return (
        <Box component={'section'}>
            {loading && <Loader/>}
            <Typography variant={'h4'} align={'center'} sx={{
                mt: 2,
                mb: 5,
                color: 'primary.main',
                textTransform: 'uppercase',
                letterSpacing: 2
            }}>
                My Books
            </Typography>
            {data.length === 0 && <Typography align={'center'} sx={{color: 'primary.secondary'}}>
                No books
            </Typography>}
            <Container sx={{py: 8}}>
                <Grid container spacing={4}>
                    {map(data, (obj) => <Book key={uniqueId('book_')} book={obj?.book} myBook={true}
                                              status={obj?.status}/>)}
                </Grid>
            </Container>
        </Box>
    )
}

export default Books