import {Card, CardActionArea, CardContent, CardMedia, Grid, Hidden, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles({
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
});

const LandingPage = () => {
    const classes = useStyles();

    return (
        <main>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h2">
                        Landing page
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <CardActionArea component="a" href="#">
                        <Card className={classes.card}>
                            <div className={classes.cardDetails}>
                                <CardContent>
                                    <Typography component="h2" variant="h5">
                                        Movie title
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        2021
                                    </Typography>
                                    <Typography variant="subtitle1" paragraph>
                                        Movie description
                                    </Typography>
                                    <Typography variant="subtitle1" color="primary">
                                        Continue reading...
                                    </Typography>
                                </CardContent>
                            </div>
                            <Hidden xsDown>
                                <CardMedia className={classes.cardMedia} image="https://source.unsplash.com/random" title="Random"/>
                            </Hidden>
                        </Card>
                    </CardActionArea>
                </Grid>
            </Grid>
        </main>
    )
}

export default LandingPage