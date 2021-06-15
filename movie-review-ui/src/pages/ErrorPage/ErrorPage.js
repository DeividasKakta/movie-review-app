import {Container, makeStyles, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
    error: {
        marginTop: theme.spacing(4)
    }
}))

const ErrorPage = () => {
    const classes = useStyles()
    const {t} = useTranslation("pages")

    return (
        <Container maxWidth="md" className={classes.error}>
            <Typography variant="h3" color="primary" align="center">
                {t('error')}
            </Typography>
        </Container>
    )
}

export default ErrorPage