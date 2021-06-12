import * as Yup from "yup";
import {Button, Card, CardActions, CardContent, CardHeader, Container, Grid, makeStyles} from "@material-ui/core";
import {Form, Formik} from "formik";
import OutlinedFormikInput from "../../inputs/OutlinedFormikInput";
import CustomSnackbar from "../../feedback/CustomSnackbar";
import {useState} from "react";
import {login} from "../../../api/userApi";
import {useDispatch} from "react-redux";
import {login as setLogin} from "../../../store/slices/userSlice";
import {useHistory, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
    mainHeader: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white
    },
    mainCard: {
        marginBottom: theme.spacing(4)
    },
    cardActions: {
        justifyContent: "center"
    }
}));

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required("validation:required"),
    password: Yup.string()
        .required("validation:required")
})

const LoginForm = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const {t} = useTranslation("forms")

    const [openError, setOpenError] = useState(false);

    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenError(false);
    };

    const postLogin = (data, {setSubmitting}) => {
        setSubmitting(true)

        login(data)
            .then(({data: loggedInUser, headers: {authorization}}) => {
                dispatch(setLogin({loggedInUser, jwt: authorization}))

                setSubmitting(false)

                const from = location.state?.from
                history.push(from || '/')
            })
            .catch(() => {
                setSubmitting(false)
                setOpenError(true)
            })
    }

    return (
        <Formik initialValues={{
            username: '',
            password: ''
        }}
                onSubmit={postLogin}
                validationSchema={validationSchema}
        >
            {props => (
                <Container maxWidth="sm">
                    <Form>

                        <Card className={classes.mainCard}>
                            <CardHeader title={t('loginTitle')} titleTypographyProps={{align: "center", variant: "h4"}}
                                        className={classes.mainHeader}/>
                            <CardContent>

                                <Grid container spacing={2}>

                                    <Grid item xs={12}>
                                        <OutlinedFormikInput name="username"
                                                             label={t('username')}
                                                             error={props.touched.username && !!props.errors.username}
                                                             placeholder={t('usernamePlaceholder')}/>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <OutlinedFormikInput name="password"
                                                             label={t('password')}
                                                             type="password"
                                                             error={props.touched.password && !!props.errors.password}
                                                             placeholder={t('passwordPlaceholder')}/>
                                    </Grid>

                                </Grid>

                            </CardContent>
                            <CardActions disableSpacing className={classes.cardActions}>

                                <Button variant="contained"
                                        fullWidth
                                        color="secondary"
                                        disabled={props.isSubmitting}
                                        type="submit"
                                >
                                    {t('submit')}
                                </Button>

                            </CardActions>

                        </Card>

                    </Form>

                    <CustomSnackbar open={openError}
                                    duration={5000}
                                    handleClose={handleErrorClose}
                                    message={t('loginError')}
                                    elevation={3}
                                    variant="filled"
                                    severity="error"/>

                </Container>
            )}
        </Formik>
    )
}

export default LoginForm