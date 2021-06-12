import {
    CardMedia,
    makeStyles,
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
import {useHistory} from "react-router-dom";
import moment from "moment";
import {useTranslation} from "react-i18next";


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontSize: theme.spacing(2)
    }
}))(TableCell);

const useStyles = makeStyles((theme) => ({
    cardMedia: {
        width: theme.spacing(8),
        height: theme.spacing(10),
    },
    mainHeader: {
        marginBottom: theme.spacing(3),
    },
    tableRow: {
        textDecoration: 0,
        cursor: "pointer"
    },
    tableCell: {
        fontSize: theme.spacing(3),
    },
    imageCell: {
        padding: theme.spacing(0.5),
    },
    ratingCell: {
        color: theme.palette.secondary.dark
    }
}))

const TopMoviesPage = () => {
    const classes = useStyles()
    const history = useHistory()

    const [topMovies, setTopMovies] = useState([])

    const {t} = useTranslation("pages")

    useEffect(() => {
        fetchTopMovies()
            .then(({data}) => setTopMovies(data))
    }, [])

    return (
        <>
            <Typography variant="h1" align="center" className={classes.mainHeader}>
                {t('topMovies')}
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell colSpan={2} align="center">
                                {t('title')}
                            </StyledTableCell>

                            <StyledTableCell align="right">
                                {t('releaseYear')}
                            </StyledTableCell>

                            <StyledTableCell align="right">
                                {t('rating')}
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {topMovies.map((movie) => (
                            <TableRow key={movie.movieId}
                                      onClick={() => history.push("/movies/" + movie.movieId)}
                                      hover
                                      className={classes.tableRow}>
                                <TableCell className={classes.imageCell}>
                                    <CardMedia className={classes.cardMedia} image={movie.picture}
                                               title={movie.title}/>
                                </TableCell>

                                <TableCell align="left" className={classes.tableCell}>
                                    {movie.title}
                                </TableCell>

                                <TableCell align="right" className={classes.tableCell}>
                                    {
                                        moment(movie.releaseDate)?.format("YYYY")
                                    }
                                </TableCell>

                                <TableCell align="right" className={`${classes.tableCell} ${classes.ratingCell}`}>
                                    {
                                        movie.averageRating === 0 ?
                                            "N/A" :
                                            movie.averageRating?.toFixed(1)
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default TopMoviesPage