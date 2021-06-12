import {Link, makeStyles, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    footer: {
        marginTop: 'auto',
        padding: theme.spacing(3),
        backgroundColor: "lightgray"
    },
}));

const Footer = () => {
    const classes = useStyles()

    const {t} = useTranslation("footer")

    return (
        <>
            <footer className={classes.footer}>
                <Typography variant="button" align="center" component="pre">
                    {t('copyright')}{' © '}
                    <Link variant="button" color="primary" exact to="/"
                          className={classes.link} component={NavLink}>
                    {t('appTitle')}
                    </Link>
                    {' 2021'}
                </Typography>
            </footer>
        </>
    )
}

export default Footer