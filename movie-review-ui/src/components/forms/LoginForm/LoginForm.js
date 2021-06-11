import * as Yup from "yup";
import {Button, Card, CardActions, CardContent, CardHeader, Container, Grid, makeStyles} from "@material-ui/core";
import {Form, Formik} from "formik";
import OutlinedFormikInput from "../../inputs/OutlinedFormikInput";
import CustomSnackbar from "../../feedback/CustomSnackbar";
import {useState} from "react";
import {login} from "../../../api/userApi";
import {useDispatch} from "react-redux";
import {login as setLogin} from "../../../store/slices/userSlice";
import {useHistory} from "react-router-dom";

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
        .required(),
    password: Yup.string()
        .required()
})

const LoginForm = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

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

                history.push('/')
            })
            .catch(() => setOpenError(true))
            .finally(() => setSubmitting(false))
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
                            <CardHeader title="Login" titleTypographyProps={{align: "center", variant: "h4"}}
                                        className={classes.mainHeader}/>
                            <CardContent>

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
                                    handleClose={handleErrorClose}
                                    message="Incorrect username or password"
                                    elevation={3}
                                    variant="filled"
                                    severity="error"/>

                </Container>
            )}
        </Formik>
    )
}

export default LoginForm