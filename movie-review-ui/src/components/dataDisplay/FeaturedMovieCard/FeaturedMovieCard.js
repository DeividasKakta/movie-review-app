import {Link} from "react-router-dom";
import {Card, CardActionArea, CardContent, CardMedia, Hidden, makeStyles, Typography} from "@material-ui/core";
import moment from "moment";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(() => ({
    card: {
        display: 'flex',
        height: "100%"
    },
    cardDetails: {
        flex: 1,
        overflowWrap: "anywhere"
    },
    cardMedia: {
        width: "30%",
    },
    collapsedCardMedia: {
        height: 250
    }
}));

const FeaturedMovieCard = ({title, releaseDate, description, cast, image, actionURL}) => {
    const classes = useStyles();

    const {t} = useTranslation("dataDisplay")

    return (
        <Card className={classes.card}>
            <CardActionArea component={Link} to={actionURL}>

                <Hidden xsDown>
                    <div className={classes.card}>
                        <CardMedia className={classes.cardMedia}
                                   image={image}
                                   component="img"
                                   title={title}/>

                        <div className={classes.cardDetails}>
                            <CardContent>
                                <Typography component="h2" variant="h4">
                                    {title}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {
                                        moment(releaseDate)?.format("YYYY")
                                    }
                                </Typography>
                                <Typography variant="subtitle2">
                                    {t('description')}
                                </Typography>
                                <Typography variant="subtitle1" paragraph>
                                    {description}
                                </Typography>
                                <Typography variant="subtitle2">
                                    {t('cast')}
                                </Typography>
                                <Typography variant="subtitle1" color="primary">
                                    {cast}
                                </Typography>
                            </CardContent>
                        </div>
                    </div>

                </Hidden>

                <Card>
                    <Hidden smUp>

                        <div className={classes.cardDetails}>
                            <CardMedia image={image}
                                       component="img"
                                       className={classes.collapsedCardMedia}
                                       title={title}/>
                            <CardContent>

                                <Typography component="h2" variant="h4">
                                    {title}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {
                                        moment(releaseDate)?.format("YYYY")
                                    }
                                </Typography>
                                <Typography variant="subtitle2">
                                    {t('description')}
                                </Typography>
                                <Typography variant="subtitle1" paragraph>
                                    {description}
                                </Typography>
                                <Typography variant="subtitle2">
                                    {t('cast')}
                                </Typography>
                                <Typography variant="subtitle1" color="primary">
                                    {cast}
                                </Typography>
                            </CardContent>
                        </div>
                    </Hidden>
                </Card>

            </CardActionArea>
        </Card>
    )
}

export default FeaturedMovieCard