import {uniqueId} from 'lodash'
import {Card, CardActions, CardContent, CardMedia} from '@mui/material'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import {useDispatch} from 'react-redux'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import NativeSelect from '@mui/material/NativeSelect'
import {addBook, deleteBook, updateBook} from '../features/Books/BooksSlice.js'

function Book({book, myBook = false, status = 0}) {
    const dispatch = useDispatch()
    const handleAdd = (isbn) => {
        dispatch(addBook({isbn}))
    }
    const handleDelete = (id) => {
        dispatch(deleteBook(id))
    }
    const handleChange = (e, id) => {
        dispatch(updateBook({id, status: Number(e.target.value)}))
    }
    return (
        <Grid item key={uniqueId('book_')} xs={12} sm={6} md={4}>
            <Card
                sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
            >
                {book?.cover && <CardMedia
                    component="div"
                    sx={{
                        // 16:9
                        pt: '56.25%'
                    }}
                    image={book.cover}
                />}
                <CardContent sx={{flexGrow: 1}}>
                    <Typography sx={{
                        mb: 2
                    }} component="h5">
                        {book.title}
                    </Typography>
                    <Typography>
                        <b>Author:</b> {book.author}
                    </Typography>
                    <Typography>
                        <b>Published:</b> {book.published}
                    </Typography>
                </CardContent>
                {
                    !myBook && <CardActions sx={{
                        justifyContent: 'flex-end'
                    }}>
                        <Button size="large" onClick={() => handleAdd(book?.isbn)}>Add</Button>
                    </CardActions>
                }
                {
                    myBook && <CardActions sx={{
                        justifyContent: 'space-between'
                    }}>
                        <Box sx={{minWidth: 120}}>
                            <FormControl fullWidth>
                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                    Status
                                </InputLabel>
                                <NativeSelect
                                    inputProps={{
                                        name: 'Status',
                                        id: 'uncontrolled-native'
                                    }}
                                    value={status}
                                    onChange={(e) => handleChange(e, book?.id)}
                                >
                                    <option value={0}>New</option>
                                    <option value={1}>Reading</option>
                                    <option value={2}>Finished</option>
                                </NativeSelect>
                            </FormControl>
                        </Box>
                        <Button size="large" color="error" onClick={() => handleDelete(book?.id)}>Delete</Button>
                    </CardActions>
                }
            </Card>
        </Grid>
    )
}

export default Book