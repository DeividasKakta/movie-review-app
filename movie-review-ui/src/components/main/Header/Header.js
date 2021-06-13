import {
    AppBar, Avatar,
    Button,
    Container,
    Divider,
    FormControl,
    Hidden,
    Link,
    makeStyles,
    MenuItem,
    Select,
    Toolbar,
    Typography
} from "@material-ui/core";
import {NavLink, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loggedInUser, logout} from "../../../store/slices/userSlice";
import MovieIcon from '@material-ui/icons/Movie';
import {useTranslation} from "react-i18next";

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
    },
    languageSelect: {
        color: theme.palette.secondary.main,
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.secondary.dark,
        }
    },
    avatar: {
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.primary.dark
    }
}));

const Header = () => {
    const classes = useStyles()
    const currentUser = useSelector(loggedInUser)
    const dispatch = useDispatch()
    const location = useLocation()

    const {t, i18n} = useTranslation("header")

    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
    }

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
                            {t('addMovie')}
                        </Link>
                    }

                    {
                        currentUser ?
                            <>
                                <div>
                                    <Avatar className={classes.avatar}>
                                        {currentUser.username?.substring(0, 1).toUpperCase()}
                                    </Avatar>
                                </div>
                                <Button color="secondary" variant="outlined" onClick={() => dispatch(logout())}
                                        className={classes.link}>
                                    {t('logout')}
                                </Button>
                            </> :
                            <>
                                <Link variant="button" color="inherit" to="/register"
                                      className={classes.link} activeClassName={classes.active} component={NavLink}>
                                    {t('register')}
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
                                    {t('login')}
                                </Button>
                            </>
                    }
                    <FormControl variant="outlined" size="small" color="secondary">
                        <Select
                            className={classes.languageSelect}
                            defaultValue={i18n.language}
                            value={i18n.language}
                            onChange={changeLanguage}
                        >
                            <MenuItem value="en">EN</MenuItem>
                            <MenuItem value="lt">LT</MenuItem>
                        </Select>
                    </FormControl>


                </Toolbar>
            </AppBar>
            <Hidden smDown>
                <Container maxWidth="md">
                    <Toolbar className={classes.menu}>
                        <Link variant="button" color="inherit" exact to="/"
                              className={classes.link} activeClassName={classes.active} component={NavLink}>
                            {t('home')}
                        </Link>

                        <Link variant="button" color="inherit" exact to="/movies/rated/top"
                              className={classes.link} activeClassName={classes.active} component={NavLink}>
                            {t('topMovies')}
                        </Link>

                        <Typography variant="h4" color="primary">
                            {t('appTitle')}
                        </Typography>

                        <Link variant="button" color="inherit" to="/reviews/newest"
                              className={classes.link} activeClassName={classes.active} component={NavLink}>
                            {t('newestReviews')}
                        </Link>

                        <Link variant="button" color="inherit" to="/about"
                              className={classes.link} activeClassName={classes.active} component={NavLink}>
                            {t('about')}
                        </Link>
                    </Toolbar>
                    <Divider/>
                </Container>
            </Hidden>

            <Hidden mdUp>
                <Typography variant="h4" color="primary" align="center" className={classes.collapsedTitle}>
                    {t('appTitle')}
                </Typography>

                <Divider className={classes.divider}/>

                <Toolbar component="nav" className={classes.collapsedMenu}>
                    <Link variant="button" color="inherit" exact to="/"
                          className={classes.collapsedLink} activeClassName={classes.active} component={NavLink}>
                        {t('home')}
                    </Link>

                    <Link variant="button" color="inherit" exact to="/movies/rated/top"
                          className={classes.collapsedLink} activeClassName={classes.active} component={NavLink}>
                        {t('topMovies')}
                    </Link>

                    <Link variant="button" color="inherit" to="/reviews/newest"
                          className={classes.collapsedLink} activeClassName={classes.active} component={NavLink}>
                        {t('newestReviews')}
                    </Link>

                    <Link variant="button" color="inherit" to="/about"
                          className={classes.collapsedLink} activeClassName={classes.active} component={NavLink}>
                        {t('about')}
                    </Link>
                </Toolbar>

                <Divider/>
            </Hidden>

        </>
    )
}

export default Header