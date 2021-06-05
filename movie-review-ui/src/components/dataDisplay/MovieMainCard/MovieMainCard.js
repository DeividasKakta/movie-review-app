import {Card, CardContent, CardMedia, Grid, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles({
    cardMedia: {
        height: 450
    },
})

const MovieMainCard = ({title, releaseDate, description, cast}) => {
    const classes = useStyles();

    return (
        <Card>
            <Grid container>
                <Grid item xs={12} sm={4}>
                    <CardMedia className={classes.cardMedia}
                               image="https://source.unsplash.com/random"
                               title="Random"
                    />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <CardContent>
                        <Typography variant="h3">
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {new Date(releaseDate).getFullYear().toString()}
                        </Typography>
                        <Typography variant="subtitle2">
                            Description
                        </Typography>
                        <Typography variant="body1">
                            {description}
                        </Typography>
                        <Typography variant="subtitle2">
                            Cast
                        </Typography>
                        <Typography variant="body1">
                            {cast}
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    )
}

export default MovieMainCard