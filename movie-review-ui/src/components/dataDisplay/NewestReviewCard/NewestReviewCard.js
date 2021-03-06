import {
    Avatar,
    Card,
    CardActionArea,
    CardContent,
    Divider,
    Grid,
    Hidden,
    ListItem,
    makeStyles,
    Typography
} from "@material-ui/core";
import {Link} from "react-router-dom";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import moment from "moment";
import {useTranslation} from "react-i18next";

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
    mainCard: {
        flexGrow: 1
    },
    userItem: {
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: theme.spacing(1)
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
    },
    movieArea: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.main
    },
    coloredDivider: {
        backgroundColor: theme.palette.secondary.dark
    },
    movieAreaTitle: {
        fontSize: theme.spacing(2.75),
        padding: theme.spacing(1),
        marginLeft: theme.spacing(1),
        color: theme.palette.primary.main
    },
    movieAreaIcon: {
        fontSize: theme.spacing(4),
        color: theme.palette.primary.main,
        marginRight: theme.spacing(1)
    },
    movieAreaIconContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginRight: theme.spacing(1)
    }
}))

const NewestReviewCard = ({username, rating, date, content, movieTitle, title, movieId}) => {
    const classes = useStyles();

    const {t} = useTranslation("dataDisplay")

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

                                </div>
                            </Hidden>

                        </CardContent>
                    </Grid>


                    <Grid item xs={12} sm={10} md={11}>

                        <CardActionArea className={classes.movieArea} component={Link} to={"/movies/" + movieId}>
                            <div className={classes.reviewHeader}>

                                <Typography className={`${classes.movieAreaTitle} ${classes.leftItem}`}
                                            display="inline">
                                    {movieTitle}
                                </Typography>

                                <span className={classes.movieAreaIconContainer}>
                                    <ArrowForwardIcon className={classes.movieAreaIcon}/>
                                </span>

                            </div>
                        </CardActionArea>

                        <CardContent style={{paddingBottom: 8,paddingTop: 8}}>
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
                                <Typography variant="subtitle2" display="inline" component="span">
                                    {t('rating')}
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary" component="pre" display="inline"
                                            className={classes.leftItem}>
                                    {": "}{rating}/10
                                </Typography>

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

export default NewestReviewCard