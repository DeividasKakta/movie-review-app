import {AppBar, Button, Container, Link, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loggedInUser, logout} from "../../../store/slices/userSlice";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    active: {
        color: theme.palette.secondary.dark
    },
    menu: {
        display: "flex",
        justifyContent: "space-evenly"
    }
}));

const Header = () => {
    const classes = useStyles()
    const currentUser = useSelector(loggedInUser)
    const dispatch = useDispatch()

    return (
        <>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Movie Review
                    </Typography>
                    <Link variant="button" color="inherit" exact to="/"
                          className={classes.link} activeClassName={classes.active} component={NavLink}>
                        Home
                    </Link>
                    <Link variant="button" color="inherit" to="/movies/create"
                          className={classes.link} activeClassName={classes.active} component={NavLink}>
                        Add new movie
                    </Link>

                    {
                        currentUser ?
                            <Button color="secondary" variant="outlined" onClick={() => dispatch(logout())}
                                    className={classes.link}>
                                Logout
                            </Button> :
                            <>
                                <Link variant="button" color="inherit" to="/register"
                                      className={classes.link} activeClassName={classes.active} component={NavLink}>
                                    Register
                                </Link>
                                <Button color="secondary" variant="outlined" to="/login"
                                        className={classes.link} component={NavLink}>
                                    Login
                                </Button>
                            </>
                    }

                </Toolbar>
            </AppBar>
            <Container maxWidth="md">
                <Toolbar className={classes.menu}>
                    <Link variant="button" color="inherit" exact to="/"
                          className={classes.link} activeClassName={classes.active} component={NavLink}>
                        Home
                    </Link>
                    <Link variant="button" color="inherit" exact to="/movies/rated/top"
                          className={classes.link} activeClassName={classes.active} component={NavLink}>
                        Top movies
                    </Link>

                    <Typography variant="h4" color="primary">
                        Movie Review
                    </Typography>

                    <Link variant="button" color="inherit" to="/reviews/newest"
                          className={classes.link} activeClassName={classes.active} component={NavLink}>
                        Newest reviews
                    </Link>
                    <Link variant="button" color="inherit" to="/about"
                          className={classes.link} activeClassName={classes.active} component={NavLink}>
                        About
                    </Link>


                </Toolbar>
            </Container>
        </>
    )
}

export default Header