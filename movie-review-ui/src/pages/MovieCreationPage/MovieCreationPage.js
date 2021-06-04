import MovieForm from "../../components/forms/MovieForm/MovieForm";
import {Grid, Typography} from "@material-ui/core";

const MovieCreationPage = () => {

    return (
        <>
            <main>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h2" align="center">
                            Add new movie
                        </Typography>
                    </Grid>
                    <MovieForm/>
                </Grid>
            </main>
        </>
    )
}

export default MovieCreationPage