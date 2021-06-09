import {Button, Card, CardContent, Divider, Grid, Hidden, ListItem, makeStyles, Typography} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {useSelector} from "react-redux";
import {loggedInUser} from "../../store/slices/userSlice";

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

const ReviewListItemCard = ({username, rating, date, content, handleOnEditReview, handleOnDeleteReview}) => {
    const classes = useStyles();
    const currentUser = useSelector(loggedInUser)

    return (
        <ListItem alignItems="flex-start" className={classes.listItem}>

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
                                    {
                                        currentUser?.username === username &&
                                        <>
                                            <Button color="secondary" onClick={handleOnEditReview}>
                                                <EditIcon/>
                                            </Button>
                                            <Button color="primary" onClick={handleOnDeleteReview}>
                                                <DeleteIcon/>
                                            </Button>
                                        </>
                                    }

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

                            <div className={classes.reviewHeader}>
                                <Typography variant="subtitle2" display="inline" className={classes.leftItem}>
                                    Rating: {rating}/10
                                </Typography>

                                <Hidden xsDown>
                                    {
                                        currentUser?.username === username &&
                                        <>
                                            <Button color="secondary" onClick={handleOnEditReview}>
                                                <EditIcon/>
                                            </Button>
                                            <Button color="primary" onClick={handleOnDeleteReview}>
                                                <DeleteIcon/>
                                            </Button>
                                        </>
                                    }
                                </Hidden>

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

        </ListItem>
    )
}

export default ReviewListItemCard