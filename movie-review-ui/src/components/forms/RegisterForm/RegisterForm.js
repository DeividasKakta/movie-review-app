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
        .required("Field can not be empty")
        .min(4, "Username must be at least 4 symbols long")
        .max(16, "Username can not be longer than 16 symbols"),
    password: Yup.string()
        .matches(/(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z\d]/, "Password must contain at least 1 number and letter")
        .required("Field can not be empty")
        .min(8, "Password must be at least 8 symbols long")
        .max(32, "Password can not be longer than 32 symbols"),
    repeatPassword: Yup.string()
        .required("Field can not be empty")
        .oneOf([Yup.ref('password')], 'Passwords must match')
})

const RegisterForm = () => {
    const classes = useStyles()
    const [openError, setOpenError] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false)

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
                            <CardHeader title="Register" titleTypographyProps={{align: "center", variant: "h4"}}
                                        className={classes.mainHeader}/>
                            <CardContent>

                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <OutlinedFormikInput name="username"
                                                             label="Username"
                                                             placeholder="Enter an username..."
                                                             error={props.touched.username && !!props.errors.username}/>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <OutlinedFormikInput name="password"
                                                             label="Password"
                                                             type="password"
                                                             placeholder="Enter a password..."
                                                             error={props.touched.password && !!props.errors.password}/>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <OutlinedFormikInput name="repeatPassword"
                                                             label="Repeat password"
                                                             type="password"
                                                             placeholder="Repeat password..."
                                                             error={props.touched.repeatPassword && !!props.errors.repeatPassword}/>
                                    </Grid>

                                </Grid>

                            </CardContent>
                            <CardActions disableSpacing className={classes.cardActions}>

                                <Button variant="contained"
                                        fullWidth
                                        color="secondary"
                                        disabled={props.isSubmitting}
                                        type="submit">Submit</Button>

                            </CardActions>

                        </Card>
                    </Form>

                    <CustomSnackbar open={openError}
                                    duration={5000}
                                    handleClose={handleSnackbarClose}
                                    message="Username already exists"
                                    elevation={3}
                                    variant="filled"
                                    severity="error"/>

                    <CustomSnackbar open={openSuccess}
                                    duration={5000}
                                    handleClose={handleSnackbarClose}
                                    message="Username created successfully"
                                    action={
                                        <>
                                            <Button color="primary" variant="outlined" to="/login"
                                                    component={NavLink}>
                                                Login
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