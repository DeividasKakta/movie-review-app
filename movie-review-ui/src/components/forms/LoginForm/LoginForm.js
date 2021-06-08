import * as Yup from "yup";
import {Button, Container, Grid, makeStyles, Paper} from "@material-ui/core";
import {Form, Formik} from "formik";
import OutlinedFormikInput from "../../inputs/OutlinedFormikInput";
import CustomSnackbar from "../../feedback/CustomSnackbar";
import {useState} from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2, 1)
    }
}));

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required(),
    password: Yup.string()
        .required()
})

const LoginForm = () => {
    const classes = useStyles()
    const [openError, setOpenError] = useState(false);

    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenError(false);
    };

    const postForm = (data, {setSubmitting}) => {
        setSubmitting(true)

    }

    return (
        <Formik initialValues={{
            username: '',
            password: ''
        }}
                onSubmit={postForm}
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
                                                         error={props.touched.username && !!props.errors.username}
                                                         placeholder="Enter your username..."/>
                                </Grid>

                                <Grid item xs={12}>
                                    <OutlinedFormikInput name="password"
                                                         label="Password"
                                                         type="password"
                                                         error={props.touched.password && !!props.errors.password}
                                                         placeholder="Enter your password..."/>
                                </Grid>

                            </Grid>

                            <Button variant="contained"
                                    fullWidth
                                    color="primary"
                                    type="submit"
                                    disabled={props.isSubmitting}>Submit</Button>

                        </Form>
                    </Paper>

                    <CustomSnackbar open={openError}
                                    duration={5000}
                                    handleClose={handleErrorClose}
                                    message="Error creating movie"
                                    elevation={3}
                                    variant="filled"
                                    severity="error"/>

                </Container>
            )}
        </Formik>
    )
}

export default LoginForm