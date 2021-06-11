import {AppBar, Button, Container, Divider, Hidden, Link, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {NavLink, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loggedInUser, logout} from "../../../store/slices/userSlice";
import MovieIcon from '@material-ui/icons/Movie';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    link: {
        margin: theme.spacing(1, 1.5),
        fontSize: theme.spacing(2)
    },
    active: {
        color: theme.palette.secondary.dark
    },
    menu: {
        display: "flex",
        justifyContent: "space-evenly"
    },
    collapsedMenu: {
        justifyContent: "space-between",
        overflowX: 'auto',
    },
    collapsedLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
        fontSize: theme.spacing(2)
    },
    collapsedTitle: {
        marginTop: theme.spacing(2)
    },
    divider: {
        marginTop: theme.spacing(2)
    }
}));

const Header = () => {
    const classes = useStyles()
    const currentUser = useSelector(loggedInUser)
    const dispatch = useDispatch()
    const location = useLocation()

    return (
        <>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <div className={classes.title}>
                        <MovieIcon fontSize="large"/>
                    </div>

                    {
                        currentUser?.roles.includes("ADMIN") &&

                        <Link variant="button" color="inherit" to="/movies/create"
                              className={classes.link} activeClassName={classes.active} component={NavLink}>
                            Add new movie
                        </Link>
                    }

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
                                <Button color="secondary"
                                        variant="outlined"
                                        to={{
                                            pathname: "/login",
                                            state: {
                                                from: location
                                            }
                                        }}
                                        className={classes.link} component={NavLink}>
                                    Login
                                </Button>
                            </>
                    }

                </Toolbar>
            </AppBar>
            <Hidden smDown>
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
                    <Divider/>
                </Container>
            </Hidden>

            <Hidden mdUp>
                <Typography variant="h4" color="primary" align="center" className={classes.collapsedTitle}>
                    Movie Review
                </Typography>

                <Divider className={classes.divider}/>

                <Toolbar component="nav" className={classes.collapsedMenu}>
                    <Link variant="button" color="inherit" exact to="/"
                          className={classes.collapsedLink} activeClassName={classes.active} component={NavLink}>
                        Home
                    </Link>

                    <Link variant="button" color="inherit" exact to="/movies/rated/top"
                          className={classes.collapsedLink} activeClassName={classes.active} component={NavLink}>
                        Top movies
                    </Link>

                    <Link variant="button" color="inherit" to="/reviews/newest"
                          className={classes.collapsedLink} activeClassName={classes.active} component={NavLink}>
                        Newest reviews
                    </Link>

                    <Link variant="button" color="inherit" to="/about"
                          className={classes.collapsedLink} activeClassName={classes.active} component={NavLink}>
                        About
                    </Link>
                </Toolbar>

                <Divider/>
            </Hidden>

        </>
    )
}

export default Header