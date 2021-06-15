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
                    Eget egestas purus viverra accumsan in nisl nisi scelerisque. Amet justo donec enim diam vulputate
                    ut pharetra sit. Velit sed ullamcorper morbi tincidunt ornare massa. Et sollicitudin ac orci
                    phasellus egestas tellus rutrum. Eget aliquet nibh praesent tristique. Felis eget nunc lobortis
                    mattis. Consequat ac felis donec et odio pellentesque diam.
                </Typography>
                <Typography variant="body1" paragraph>
                    Auctor eu augue ut lectus arcu bibendum. Eu scelerisque felis imperdiet proin fermentum leo vel.
                    Justo nec ultrices dui sapien eget mi. Volutpat ac tincidunt vitae semper quis lectus nulla at
                    volutpat. Diam volutpat commodo sed egestas egestas.
                </Typography>

                <Divider/>

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