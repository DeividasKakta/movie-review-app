import {Card, CardActionArea, CardContent, Divider, Grid, Hidden, makeStyles, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
    listItem: {
        paddingLeft: 0,
        paddingRight: 0
    },
    reviewHeader: {
        display: "flex"
    },
    leftItem: {
        flexGrow: 1
    },
    itemContent: {
        padding: theme.spacing(1)
    },
    verticalDivider: {
        marginRight: "-1px"
    },
    mainCard: {
        flexGrow: 1
    }
}))

const NewestReviewCard = ({username, rating, date, content, movieTitle, movieId}) => {
    const classes = useStyles();

    return (
        <>
            <Card className={classes.mainCard}>
                <Grid container>
                    <Grid item xs={12} sm={3} md={2}>
                        <CardContent className={classes.itemContent}>

                            <Hidden xsDown>
                                <Typography variant="subtitle2" noWrap>
                                    {username}
                                </Typography>
                            </Hidden>

                            <Hidden smUp>
                                <div className={classes.reviewHeader}>
                                    <Typography variant="subtitle2" display="inline" className={classes.leftItem}>
                                        {username}
                                    </Typography>

                                </div>
                            </Hidden>

                        </CardContent>
                    </Grid>

                    <Hidden xsDown>
                        <Divider flexItem orientation="vertical" className={classes.verticalDivider}/>
                    </Hidden>

                    <Hidden smUp>
                        <Grid item xs={12}>
                            <Divider/>
                        </Grid>
                    </Hidden>

                    <Grid item xs={12} sm={9} md={10}>
                        <CardContent className={classes.itemContent}>

                            <CardActionArea component={Link} to={"/movies/" + movieId}>
                                <Typography>
                                    {movieTitle}
                                    <NavigateNextIcon/>
                                </Typography>
                            </CardActionArea>

                            <div className={classes.reviewHeader}>
                                <Typography variant="subtitle2" display="inline" className={classes.leftItem}>
                                    Rating: {rating}/10
                                </Typography>


                                <Typography variant="subtitle1" color="textSecondary" align="right" display="inline">
                                    {date}
                                </Typography>
                            </div>

                            <Typography variant="body1">
                                {content}
                            </Typography>

                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </>
    )
}

export default NewestReviewCard