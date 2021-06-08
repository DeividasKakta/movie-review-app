import Container from "@material-ui/core/Container";
import {Paper} from "@material-ui/core";
import {Form, Formik} from "formik";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import {createUser} from "../../api/usersApi";
import OutlinedFormikInput from "../../inputs/OutlinedFormikInput";

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required(),
    surname: Yup.string()
        .required(),
    email: Yup.string()
        .email()
        .required(),
    password: Yup.string()
        .required()
        .min(5),
    repeatPassword: Yup.string()
        .required()
        .oneOf([Yup.ref('password')], 'Passwords must match')
})

const UserRegistration = () => {


    return (
        <Formik initialValues={{
            name: '',
            surname: '',
            email: '',
            password: '',
            repeatPassword: ''
        }}
                onSubmit={
                    (values, helpers) => {

                        createUser(values)
                            .then(() => console.log(values))
                            .catch(error => console.log(error))

                        helpers.setSubmitting(true)
                        setTimeout(() => {
                            helpers.setSubmitting(false)
                        }, 3000)
                    }
                }
                validationSchema={validationSchema}
        >
            {props => (
                <>
                    <Container maxWidth="sm">
                        <h2>Register</h2>

                        <Paper elevation={3}>
                            <Form>
                                <div>
                                    <OutlinedFormikInput name="name"
                                                         label="Name"
                                                         error={props.touched.name && !!props.errors.name}/>
                                </div>

                                <div>
                                    <OutlinedFormikInput name="surname"
                                                         label="Surname"
                                                         error={props.touched.surname && !!props.errors.surname}/>
                                </div>

                                <div>
                                    <OutlinedFormikInput name="email"
                                                         label="Email"
                                                         error={props.touched.email && !!props.errors.email}/>
                                </div>

                                <div>
                                    <OutlinedFormikInput name="password"
                                                         label="Password"
                                                         type="password"
                                                         error={props.touched.password && !!props.errors.password}/>
                                </div>

                                <div>
                                    <OutlinedFormikInput name="repeatPassword"
                                                         label="Repeat password"
                                                         type="password"
                                                         error={props.touched.repeatPassword && !!props.errors.repeatPassword}/>
                                </div>

                                <Button variant="contained"
                                        style={{marginBottom: 10, marginTop: 10}}
                                        fullWidth
                                        color="primary"
                                        disabled={props.isSubmitting}
                                        type="submit">Submit</Button>
                            </Form>
                        </Paper>

                    </Container>
                </>
            )}
        </Formik>
    )
}

export default UserRegistration;