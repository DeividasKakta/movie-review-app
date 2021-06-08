import {Card, CardActionArea, CardContent, CardMedia, Grid, Hidden, makeStyles, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
import {fetchMovies} from "../../api/moviesApi";
import {Link} from "react-router-dom";

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
    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetchMovies()
            .then(({data}) => setMovies(data))
    }, [])

    return (
        <main>
            <Grid container spacing={4} className={classes.gridContainer}>
                <Grid item xs={12}>
                    <Typography variant="h2">
                        Landing page
                    </Typography>
                </Grid>

                {movies.map((movie) => (
                    <Grid key={movie.movieId} item xs={12} md={6} className={classes.centeredGrid}>
                        <CardActionArea  component={Link} to={"/movies/" + movie.movieId}>
                            <Card className={classes.card}>
                                <div className={classes.cardDetails}>
                                    <CardContent>
                                        <Typography component="h2" variant="h5">
                                            {movie.title}
                                            {movie.averageRating?.toFixed(1)}
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            {new Date(movie.releaseYear).getFullYear()}
                                        </Typography>
                                            <Typography variant="subtitle1" paragraph>
                                                {movie.description}
                                            </Typography>
                                        <Typography variant="subtitle1" color="primary">
                                            {movie.cast}
                                        </Typography>
                                    </CardContent>
                                </div>
                                <Hidden xsDown>
                                    <CardMedia className={classes.cardMedia} image="https://source.unsplash.com/random"
                                               title="Random"/>
                                </Hidden>
                            </Card>
                        </CardActionArea>
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default LandingPage