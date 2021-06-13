import MovieForm from "../../components/forms/MovieForm/MovieForm";
import {makeStyles} from "@material-ui/core";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchRatedMovieById} from "../../api/moviesApi";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        marginTop: theme.spacing(4)
    }
}))

const MovieCreationPage = () => {
    const classes = useStyles()

    const [movie, setMovie] = useState(null)

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            fetchRatedMovieById(id)
                .then(({data}) => setMovie(data))
        }
    }, [id])

    return (
        <>
            <main className={classes.mainContainer}>
                <MovieForm movie={movie}/>
            </main>
        </>
    )
}

export default MovieCreationPage