import Container from "@material-ui/core/Container";
import {Grid, makeStyles, Paper} from "@material-ui/core";
import {Form, Formik} from "formik";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import OutlinedFormikInput from "../../inputs/OutlinedFormikInput";
import {register} from "../../../api/userApi";
import CustomSnackbar from "../../feedback/CustomSnackbar";
import {useState} from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2, 1)
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
    const [openError, setOpenError] = useState(false);

    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenError(false);
    };

    return (
        <Formik initialValues={{
            username: '',
            password: '',
            repeatPassword: ''
        }}
                onSubmit={
                    (values, helpers) => {

                        register(values)
                            .then(() => console.log(values))
                            .catch(() => setOpenError(true))

                        helpers.setSubmitting(true)
                        setTimeout(() => {
                            helpers.setSubmitting(false)
                        }, 300)
                    }
                }
                validationSchema={validationSchema}
        >
            {props => (
                <Container maxWidth="sm">
                    <Paper elevation={3} className={classes.root}>
                        <Form>
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

                            <Button variant="contained"
                                    fullWidth
                                    color="primary"
                                    disabled={props.isSubmitting}
                                    type="submit">Submit</Button>

                        </Form>
                    </Paper>

                    <CustomSnackbar open={openError}
                                    duration={5000}
                                    handleClose={handleErrorClose}
                                    message="Username already exists"
                                    elevation={3}
                                    variant="filled"
                                    severity="error"/>

                </Container>
            )}
        </Formik>
    )
}

export default RegisterForm;