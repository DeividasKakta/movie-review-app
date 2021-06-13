import {Grid, List, makeStyles, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
import {fetchMovies} from "../../api/moviesApi";
import FeaturedMovieCard from "../../components/dataDisplay/FeaturedMovieCard/FeaturedMovieCard";
import SecondaryMovieItem from "../../components/dataDisplay/SecondaryMovieItem/SecondaryMovieItem";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
        overflowWrap: "anywhere"
    },
    cardMedia: {
        width: 200,
    },
    centeredGrid: {
        display: 'grid',
        alignItems: 'center'
    },
    gridContainer: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    }
}));

const LandingPage = () => {
    const classes = useStyles();
    const [newMovies, setNewMovies] = useState([])
    const [movies, setMovies] = useState([])

    const {t} = useTranslation("pages")

    useEffect(() => {
        fetchMovies()
            .then(({data}) => {
                let firstMovies = [...data]
                let restMovies = [...data]
                setMovies(firstMovies.splice(2))
                setNewMovies(restMovies.splice(0, 2))
            })
    }, [])

    return (
        <main>
            <Grid container spacing={4} className={classes.gridContainer}>
                <Grid item xs={12}>
                    <Typography variant="h1" align="center">
                        {t('welcome')}
                    </Typography>
                </Grid>

            </Grid>

            <Grid container spacing={4}>
                {
                    newMovies.map((movie) => (
                        <Grid key={movie.movieId} item xs={12} md={6}>

                            <FeaturedMovieCard actionURL={"/movies/" + movie.movieId}
                                               title={movie.title}
                                               releaseDate={movie.releaseDate}
                                               description={movie.description}
                                               cast={movie.cast}
                                               image={movie.picture}/>

                        </Grid>
                    ))
                }
            </Grid>

            <List>
                {
                    movies.map((movie) => (
                        <Grid key={movie.movieId}>
                            <SecondaryMovieItem actionURL={"/movies/" + movie.movieId}
                                                description={movie.description}
                                                title={movie.title}
                                                cast={movie.cast}
                                                releaseDate={movie.releaseDate}/>
                        </Grid>
                    ))
                }
            </List>

        </main>
    )
}

export default LandingPage