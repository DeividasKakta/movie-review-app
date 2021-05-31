import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {
    Button,
    Container,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    makeStyles,
    OutlinedInput,
    Paper,
    Typography
} from "@material-ui/core";
import {KeyboardDatePicker} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2, 1)
    }
}));

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
    const classes = useStyles()
    const now = new Date()

    return (
        <Formik initialValues={{
            title: '',
            description: '',
            cast: '',
            releaseDate: now
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
                <Container maxWidth="sm">
                    <Paper elevation={3} className={classes.root}>
                        <Typography variant="h4" align="center">
                            Add new movie
                        </Typography>
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <FormControl error={props.touched.title && !!props.errors.title} fullWidth
                                                 variant="outlined" margin="normal">
                                        <InputLabel htmlFor="title">Title</InputLabel>
                                        <Field id="title" name="title" label="Title" placeholder="Type..."
                                               as={OutlinedInput}/>
                                        <ErrorMessage name="title" component={FormHelperText}/>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <FormControl error={props.touched.releaseDate && !!props.errors.releaseDate}
                                                 variant="standard" margin="normal">
                                        <Field id="releaseDate" name="releaseDate" label="Release date"
                                               format="yyyy/MM/dd" inputVariant="outlined"
                                               onChange={val => {
                                                   props.setFieldValue("releaseDate", val);
                                               }}
                                               as={KeyboardDatePicker}/>
                                        <ErrorMessage name="releaseDate" component={FormHelperText}/>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl error={props.touched.description && !!props.errors.description}
                                                 fullWidth
                                                 variant="outlined" margin="normal">
                                        <InputLabel htmlFor="description">Description</InputLabel>
                                        <Field id="description" name="description" label="Description"
                                               placeholder="Type..."
                                               as={OutlinedInput}/>
                                        <ErrorMessage name="description" component={FormHelperText}/>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl error={props.touched.cast && !!props.errors.cast} fullWidth
                                                 variant="outlined" margin="normal">
                                        <InputLabel htmlFor="cast">Cast</InputLabel>
                                        <Field id="cast" name="cast" label="Cast" placeholder="Type..."
                                               as={OutlinedInput}/>
                                        <ErrorMessage name="description" component={FormHelperText}/>
                                    </FormControl>
                                </Grid>

                            </Grid>


                            {/*<div>*/}
                            {/*    <FormikInput name="surname"*/}
                            {/*                 label="Surname"*/}
                            {/*                 error={props.touched.surname && !!props.errors.surname}/>*/}
                            {/*</div>*/}


                            {!props.isSubmitting ? <Button variant="contained"
                                                           fullWidth
                                                           color="primary"
                                                           type="submit">Submit</Button> :
                                <span>Submitting...</span>}
                        </Form>
                    </Paper>

                </Container>
            )}
        </Formik>
    )
}

export default MovieForm