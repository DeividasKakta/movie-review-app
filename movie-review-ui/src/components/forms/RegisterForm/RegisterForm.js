import Container from "@material-ui/core/Container";
import {Card, CardActions, CardContent, CardHeader, Grid, makeStyles} from "@material-ui/core";
import {Form, Formik} from "formik";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import OutlinedFormikInput from "../../inputs/OutlinedFormikInput";
import {register} from "../../../api/userApi";
import CustomSnackbar from "../../feedback/CustomSnackbar";
import {useState} from "react";
import {NavLink} from "react-router-dom";
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
        .required("validation:required")
        .min(4, "validation:usernameMin")
        .max(16, "validation:usernameMax"),
    password: Yup.string()
        .matches(/(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z\d]/, "validation:passwordRegex")
        .required("validation:required")
        .min(8, "validation:passwordMin")
        .max(32, "validation:passwordMax"),
    repeatPassword: Yup.string()
        .required("validation:required")
        .oneOf([Yup.ref('password')], "validation:repeatPassword")
})

const RegisterForm = () => {
    const classes = useStyles()
    const [openError, setOpenError] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false)

    const {t} = useTranslation("forms")

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false)
        setOpenError(false)
    };

    const postRegister = (data, {setSubmitting}) => {
        setSubmitting(true)

        register(data)
            .then(() => setOpenSuccess(true))
            .catch(() => setOpenError(true))
            .finally(() => {
                setTimeout(() => {
                    setSubmitting(false)
                }, 300)
            })
    }

    return (
        <Formik initialValues={{
            username: '',
            password: '',
            repeatPassword: ''
        }}
                onSubmit={postRegister}
                validationSchema={validationSchema}
        >
            {props => (
                <Container maxWidth="sm">
                    <Form>
                        <Card className={classes.mainCard}>
                            <CardHeader title={t('registerTitle')} titleTypographyProps={{align: "center", variant: "h4"}}
                                        className={classes.mainHeader}/>
                            <CardContent>

                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <OutlinedFormikInput name="username"
                                                             label={t('username')}
                                                             placeholder={t('usernamePlaceholder')}
                                                             error={props.touched.username && !!props.errors.username}/>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <OutlinedFormikInput name="password"
                                                             label={t('password')}
                                                             type="password"
                                                             placeholder={t('passwordPlaceholder')}
                                                             error={props.touched.password && !!props.errors.password}/>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <OutlinedFormikInput name="repeatPassword"
                                                             label={t('repeatPassword')}
                                                             type="password"
                                                             placeholder={t('repeatPasswordPlaceholder')}
                                                             error={props.touched.repeatPassword && !!props.errors.repeatPassword}/>
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
                                    {t('registerButton')}
                                </Button>

                            </CardActions>

                        </Card>
                    </Form>

                    <CustomSnackbar open={openError}
                                    duration={5000}
                                    handleClose={handleSnackbarClose}
                                    message={t('usernameExistsError')}
                                    elevation={3}
                                    variant="filled"
                                    severity="error"/>

                    <CustomSnackbar open={openSuccess}
                                    duration={5000}
                                    handleClose={handleSnackbarClose}
                                    message={t('accountCreationSuccess')}
                                    action={
                                        <>
                                            <Button color="primary" variant="outlined" to="/login"
                                                    component={NavLink}>
                                                {t('header:login')}
                                            </Button>
                                        </>
                                    }
                                    elevation={3}
                                    variant="filled"
                                    severity="success"/>

                </Container>
            )}
        </Formik>
    )
}

export default RegisterForm;