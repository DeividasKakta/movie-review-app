import {Card, CardContent, CardMedia, Grid, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles({
    cardMedia: {
        height: 450
    },
    flexItem: {
        display: "flex"
    },
    leftItem: {
        flexGrow: 1
    }
})

const MovieMainCard = ({title, releaseDate, description, cast, rating}) => {
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

                        <div className={classes.flexItem}>
                            <Typography variant="h3" display="inline" className={classes.leftItem}>
                                {title}
                            </Typography>

                            <Typography variant="h4" color="secondary">
                                {
                                    rating === 0 ? "N/A" :
                                        rating?.toFixed(1)
                                }
                            </Typography>
                        </div>

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