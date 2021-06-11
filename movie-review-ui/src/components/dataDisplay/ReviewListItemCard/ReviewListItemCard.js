import {
    Avatar,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    Hidden,
    ListItem,
    makeStyles,
    Typography
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {useSelector} from "react-redux";
import {loggedInUser} from "../../../store/slices/userSlice";
import moment from "moment";

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
    root: {
        paddingBottom: 0
    },
    verticalDivider: {
        marginRight: "-1px"
    },
    mainCard: {
        flexGrow: 1
    },
    userItem: {
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: theme.spacing(1)
    },
    actionIcons: {
        paddingTop: 0
    },
    userArea: {
        backgroundColor: theme.palette.primary.light,
    },
    avatarColor: {
        backgroundColor: theme.palette.secondary.dark
    },
    usernameTextColor: {
        color: theme.palette.common.white
    },
    deleteButton: {
        color: theme.palette.error.dark
    },
    userHeader: {
        paddingBottom: 0
    },
    ratingText: {
        marginBottom: theme.spacing(1)
    },
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    usernameAlign: {
        paddingLeft: theme.spacing(1),
        marginBottom: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontSize: theme.spacing(2.25)
    }
}))

const ReviewListItemCard = ({username, rating, date, title, content, handleOnEditReview, handleOnDeleteReview}) => {
    const classes = useStyles();
    const currentUser = useSelector(loggedInUser)

    return (
        <ListItem alignItems="flex-start" className={classes.listItem}>

            <Card className={classes.mainCard}>
                <Grid container>
                    <Grid item xs={12} sm={2} md={1} className={classes.userArea}>
                        <CardContent style={{paddingBottom: 8}}>

                            <Hidden xsDown>
                                <div>
                                    <div>
                                        <Avatar className={`${classes.userItem} ${classes.avatarColor}`}>
                                            {username?.substring(0, 1).toUpperCase()}
                                        </Avatar>
                                    </div>

                                    <Typography variant="subtitle2" align="center" className={classes.usernameTextColor}
                                                noWrap>
                                        {username}
                                    </Typography>
                                </div>
                            </Hidden>

                            <Hidden smUp>
                                <div className={classes.reviewHeader}>
                                    <div>
                                        <Avatar className={`${classes.userItem} ${classes.avatarColor}`}>
                                            {username?.substring(0, 1).toUpperCase()}
                                        </Avatar>
                                    </div>
                                    <Typography variant="subtitle2"
                                                display="inline"
                                                className={`${classes.usernameTextColor} ${classes.leftItem} ${classes.usernameAlign}`}>
                                        {username}
                                    </Typography>

                                    {
                                        currentUser?.username === username &&
                                        <Button color="secondary" className={classes.actionIcons}
                                                onClick={handleOnEditReview}>
                                            <EditIcon/>
                                        </Button>
                                    }
                                    {
                                        (currentUser?.username === username || currentUser?.roles.includes('ADMIN')) &&
                                        <Button className={`${classes.deleteButton} ${classes.actionIcons}`}
                                                onClick={handleOnDeleteReview}>
                                            <DeleteIcon/>
                                        </Button>
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

                    <Grid item xs={12} sm={10} md={11}>
                        <CardContent style={{paddingBottom: 8}}>

                            <div>
                                <Typography variant="h6" className={classes.leftItem}>
                                    {title}
                                </Typography>
                            </div>

                            <Typography variant="body1">
                                {content}
                            </Typography>

                            <Divider className={classes.divider}/>

                            <div className={`${classes.ratingText} ${classes.reviewHeader}`}>
                                <Typography variant="subtitle2" display="inline" component="pre">
                                    {"Rating: "}
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary" component="span" display="inline"
                                            className={classes.leftItem}>
                                    {rating}/10
                                </Typography>

                                <Hidden xsDown>
                                    {
                                        currentUser?.username === username &&
                                        <Button className={classes.actionIcons} color="secondary"
                                                onClick={handleOnEditReview}>
                                            <EditIcon/>
                                        </Button>
                                    }
                                    {
                                        (currentUser?.username === username || currentUser?.roles.includes('ADMIN')) &&
                                        <Button className={`${classes.deleteButton} ${classes.actionIcons}`}
                                                color="primary" onClick={handleOnDeleteReview}>
                                            <DeleteIcon/>
                                        </Button>
                                    }
                                </Hidden>

                                <Typography variant="subtitle1" color="textSecondary" align="right" display="inline">
                                    {
                                        moment(date)?.format("YYYY-MM-DD HH:mm")
                                    }
                                </Typography>
                            </div>

                        </CardContent>
                    </Grid>
                </Grid>
            </Card>

        </ListItem>
    )
}

export default ReviewListItemCard