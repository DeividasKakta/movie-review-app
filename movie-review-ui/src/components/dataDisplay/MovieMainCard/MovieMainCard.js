import {Card, CardContent, CardMedia, Divider, Grid, makeStyles, Typography} from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from "moment";

const useStyles = makeStyles((theme) => ({
    cardMedia: {
        height: 450
    },
    flexItem: {
        display: "flex"
    },
    leftItem: {
        flexGrow: 1
    },
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}))

const MovieMainCard = ({title, releaseDate, description, cast, rating, picture}) => {
    const classes = useStyles();

    return (
        <Card>
            <Grid container>
                <Grid item xs={12} sm={4}>
                    {
                        picture ?
                            <CardMedia className={classes.cardMedia}
                                       image={picture}
                                       title="Random"
                            /> :
                            <CircularProgress/>
                    }

                </Grid>
                <Grid item xs={12} sm={8}>
                    <CardContent>

                        <div>
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

                            <Typography variant="h6" color="textSecondary">
                                {
                                    moment(releaseDate)?.format("YYYY")
                                }
                            </Typography>
                        </div>

                        <Divider className={classes.divider}/>

                        <div>
                            <Typography variant="subtitle2">
                                Description
                            </Typography>
                            <Typography variant="body1">
                                {description}
                            </Typography>
                        </div>

                        <Divider className={classes.divider}/>

                        <div>
                            <Typography variant="subtitle2">
                                Cast
                            </Typography>
                            <Typography variant="body1">
                                {cast}
                            </Typography>
                        </div>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    )
}

export default MovieMainCard