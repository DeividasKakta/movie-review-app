import * as Yup from "yup";
import {Form, Formik, ErrorMessage, Field} from "formik";
import {Button, Container, FormControl, FormHelperText, InputLabel, OutlinedInput, Paper} from "@material-ui/core";

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required(),
    description: Yup.string()
        .required(),
    cast: Yup.string()
        .required(),
    releaseDate: Yup.date()
        .required()
})

const MovieForm = () => {

    return (
        <Formik initialValues={{
            title: '',
            description: '',
            cast: '',
            releaseDate: ''
        }}
                onSubmit={
                    (values, helpers) => {
                        // call api
                        helpers.setSubmitting(true)
                        setTimeout(() => {
                            helpers.setSubmitting(false)
                        }, 2000)
                    }
                }
                validationSchema={validationSchema}
        >
            {props => (
                <>
                    <Container maxWidth="sm">
                        <h2>Add new movie</h2>

                        <Paper elevation={3}>
                            <Form style={{margin: 10}}>
                                <div>
                                    <FormControl error={props.touched.title && !!props.errors.title} fullWidth variant="outlined" margin="normal">
                                        <InputLabel htmlFor="title">Title</InputLabel>
                                        <Field id="title" name="title" label="Title" placeholder="Type..." as={OutlinedInput} />
                                        <ErrorMessage name="title" component={FormHelperText}/>
                                    </FormControl>
                                </div>

                                {/*<div>*/}
                                {/*    <FormikInput name="surname"*/}
                                {/*                 label="Surname"*/}
                                {/*                 error={props.touched.surname && !!props.errors.surname}/>*/}
                                {/*</div>*/}



                                {!props.isSubmitting ? <Button variant="contained"
                                                               style={{marginBottom: 10, marginTop: 10}}
                                                               fullWidth
                                                               color="primary"
                                                               type="submit">Submit</Button> :
                                    <span>Submitting...</span>}
                            </Form>
                        </Paper>

                    </Container>
                </>
            )}
        </Formik>
    )
}

export default MovieForm