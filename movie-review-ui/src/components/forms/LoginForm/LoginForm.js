import * as Yup from "yup";
import {Button, Container, Grid, makeStyles, Paper} from "@material-ui/core";
import {Form, Formik} from "formik";
import OutlinedFormikInput from "../../inputs/OutlinedFormikInput";
import CustomSnackbar from "../../feedback/CustomSnackbar";
import {useState} from "react";
import {login} from "../../../api/userApi";
import {useDispatch} from "react-redux";
import {login as setLogin} from "../../../store/slices/userSlice";
import {useHistory} from "react-router-dom";

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

    const dispatch = useDispatch()
    const history = useHistory()
    // const location = useLocation()

    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenError(false);
    };

    const postForm = (data, {setSubmitting}) => {
        setSubmitting(true)

        login(data)
            .then(({data: loggedInUser, headers: {authorization}}) => {
                dispatch(setLogin({loggedInUser, jwt: authorization}))

                history.push('/')
            })
            .finally(() => setSubmitting(false))
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
                                    message="Error while trying to login"
                                    elevation={3}
                                    variant="filled"
                                    severity="error"/>

                </Container>
            )}
        </Formik>
    )
}

export default LoginForm