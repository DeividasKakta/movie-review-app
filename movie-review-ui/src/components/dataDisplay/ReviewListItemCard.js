import {Card, CardContent, Divider, Grid, Hidden, ListItem, makeStyles, Typography} from "@material-ui/core";

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
    }
}))

const ReviewListItemCard = ({username, rating, date, content}) => {
    const classes = useStyles();


    return (
        <ListItem alignItems="flex-start" className={classes.listItem}>

            <Card>
                <Grid container>
                    <Grid item xs={12} sm={3} md={2}>
                        <CardContent className={classes.itemContent}>
                            <Typography variant="subtitle2">
                                {username}
                            </Typography>
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