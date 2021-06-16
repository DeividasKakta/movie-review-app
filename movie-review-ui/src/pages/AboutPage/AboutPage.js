import {Container, Divider, Link, makeStyles, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import GitHubIcon from '@material-ui/icons/GitHub';

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

            <Container maxWidth="sm">
                <Typography variant="body1" paragraph>
                    {t('aboutPartOne')}
                </Typography>
                <Typography variant="body1" paragraph>
                    {t('aboutPartTwo')}
                </Typography>

                <Divider/>

                <div align="center">
                    <Typography color="primary" paragraph variant="h6">
                        {t('author')}
                    </Typography>
                    <Typography variant="body1" paragraph align="center">
                        {t('authorName')}
                    </Typography>
                </div>

                <div align="center">
                    <Typography color="primary" paragraph variant="h6">
                        {t('links')}
                    </Typography>
                    <Link variant="body1" color="primary" href="https://github.com/DeividasKakta/" component="a">
                        <GitHubIcon/>
                    </Link>
                </div>

            </Container>
        </>
    )
}

export default AboutPage