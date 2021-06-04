import {makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    footer: {
        marginTop: 'auto',
        padding: theme.spacing(3),
        backgroundColor: "lightgray"
    },
}));

const Footer = () => {
    const classes = useStyles()

    return (
        <>
            <footer className={classes.footer}>
                <Typography variant="h6" align="center">
                    {'Copyright © 2021'}
                </Typography>
            </footer>
        </>
    )
}

export default Footer