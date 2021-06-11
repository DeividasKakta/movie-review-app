import MovieForm from "../../components/forms/MovieForm/MovieForm";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        marginTop: theme.spacing(4)
    }
}))

const MovieCreationPage = () => {
    const classes = useStyles()

    return (
        <>
            <main className={classes.mainContainer}>
                <MovieForm/>
            </main>
        </>
    )
}

export default MovieCreationPage