import {makeStyles, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
    mainHeader: {
        marginBottom: theme.spacing(3),
    }
}))

const AboutPage = () => {
    const classes = useStyles()

    const {t} = useTranslation("pages")

    return (
        <>
            <Typography variant="h1" align="center" className={classes.mainHeader}>
                {t('about')}
            </Typography>
        </>
    )
}

export default AboutPage