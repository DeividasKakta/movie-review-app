import {Card, CardActionArea, CardContent, Divider, Grid, ListItem, makeStyles, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import moment from "moment";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
    listItem: {
        paddingLeft: 0,
        paddingRight: 0
    },
    reviewHeader: {
        display: "flex",

    },
    leftItem: {
        flexGrow: 1,
        color: theme.palette.common.white
    },
    itemContent: {
        padding: theme.spacing(2),
        paddingTop: theme.spacing(1),
    },
    verticalDivider: {
        marginRight: "-1px"
    },
    mainCard: {
        flexGrow: 1
    },
    cardHeader: {
        backgroundColor: theme.palette.primary.light,
    }
}))

const SecondaryMovieItem = ({actionURL, description, cast, title, releaseDate}) => {
    const classes = useStyles();

    const {t} = useTranslation("dataDisplay")

    return (
        <>
            <ListItem alignItems="flex-start" className={classes.listItem}>
                <Card className={classes.mainCard}>
                    <CardActionArea component={Link} to={actionURL}>
                        <Grid container>

                            <Grid item xs={12} className={classes.cardHeader}>
                                <CardContent className={classes.itemContent} style={{paddingBottom: 8}}>
                                    <div className={classes.reviewHeader}>
                                        <Typography variant="h6"
                                                    display="inline"
                                                    className={classes.leftItem}>
                                            {title}
                                        </Typography>

                                        <Typography variant="subtitle1"
                                                    color="secondary"
                                                    align="right"
                                                    display="inline">
                                            {
                                                moment(releaseDate)?.format("YYYY")
                                            }
                                        </Typography>
                                    </div>
                                </CardContent>
                            </Grid>

                            <Grid item xs={12}>
                                <CardContent className={classes.itemContent} style={{paddingBottom: 8}}>
                                    <Typography variant="subtitle2" noWrap>
                                        {t('description')}
                                    </Typography>

                                    <Typography variant="body1" noWrap>
                                        {description}
                                    </Typography>

                                    <Divider/>

                                    <Typography variant="subtitle2" noWrap>
                                        {t('cast')}
                                    </Typography>

                                    <Typography variant="body1" noWrap>
                                        {cast}
                                    </Typography>

                                    <Divider/>

                                    <Typography variant="subtitle2" color="secondary">
                                        {t('continueReading')}
                                    </Typography>
                                </CardContent>
                            </Grid>

                        </Grid>
                    </CardActionArea>
                </Card>

            </ListItem>
        </>
    )
}

export default SecondaryMovieItem