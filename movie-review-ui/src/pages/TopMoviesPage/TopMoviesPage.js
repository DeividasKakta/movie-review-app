import {
    CardMedia, makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    withStyles
} from "@material-ui/core";
import {useEffect, useState} from "react";
import {fetchTopMovies} from "../../api/moviesApi";


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: theme.spacing(3),
    },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
    cardMedia: {
        width: theme.spacing(5),
        height: theme.spacing(8)
    },
    mainHeader: {
        marginBottom: theme.spacing(3),
    }
}))

const TopMoviesPage = () => {
    const classes = useStyles()
    const [topMovies, setTopMovies] = useState([])


    useEffect(() => {
        fetchTopMovies()
            .then(({data}) => setTopMovies(data))
    }, [])

    return (
        <>
            <Typography variant="h1" align="center" className={classes.mainHeader}>Top movies</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell colSpan={2} align="center">Title</StyledTableCell>
                            <StyledTableCell align="right">Release year</StyledTableCell>
                            <StyledTableCell align="right">Rating</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {topMovies.map((movie) => (
                            <TableRow key={movie.movieId}>
                                <StyledTableCell component="th" scope="row">
                                    <CardMedia className={classes.cardMedia} image={movie.picture}
                                               title="Random"/>
                                </StyledTableCell>
                                <StyledTableCell align="left">{movie.title}</StyledTableCell>
                                <StyledTableCell align="right">{new Date(movie.releaseDate).getFullYear()}</StyledTableCell>
                                <StyledTableCell align="right">{movie.averageRating?.toFixed(1)}</StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default TopMoviesPage