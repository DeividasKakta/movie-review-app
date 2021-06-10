import {AppBar, Button, IconButton, Link, makeStyles, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu"
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {loggedInUser} from "../../../store/slices/userSlice";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    active: {
        fontSize: theme.spacing(2)
    }
}));

const Header = () => {
    const classes = useStyles();
    const currentUser = useSelector(loggedInUser)

    return (
        <>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
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
                            <Button color="secondary" variant="outlined" to="/"
                                    className={classes.link} component={NavLink}>
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
        </>
    )
}

export default Header