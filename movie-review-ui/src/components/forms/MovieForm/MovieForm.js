import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {
    Button,
    Container,
    FormControl,
    FormHelperText,
    Grid,
    makeStyles,
    Paper
} from "@material-ui/core";
import {KeyboardDatePicker} from "@material-ui/pickers";
import {createMovie} from "../../../api/moviesApi";
import CustomSnackbar from "../../feedback/CustomSnackbar";
import {useState} from "react";
import OutlinedFormikInput from "../../inputs/OutlinedFormikInput";

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

    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenError(false);
    };

    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false);
    };

    const postForm = (data, {setSubmitting}) => {
        setSubmitting(true)

        createMovie(data)
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
            title: '',
            description: '',
            cast: '',
            releaseDate: now
        }}
                onSubmit={postForm}
                validationSchema={validationSchema}
        >
            {props => (
                <Container maxWidth="sm">
                    <Paper elevation={3} className={classes.root}>
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <OutlinedFormikInput name="title"
                                                         label="Title"
                                                         error={props.touched.title && !!props.errors.title}
                                                         placeholder="Enter movie title..."/>
                                </Grid>

                                <Grid item xs={6}>
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
                                    <OutlinedFormikInput name="description"
                                                         label="Description"
                                                         error={props.touched.description && !!props.errors.description}
                                                         placeholder="Enter movie description..."
                                                         multiline
                                                         rows={4}/>
                                </Grid>

                                <Grid item xs={12}>
                                    <OutlinedFormikInput name="cast"
                                                         label="Cast"
                                                         error={props.touched.cast && !!props.errors.cast}
                                                         placeholder="Enter movie cast..."
                                                         multiline
                                                         rows={2}/>
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

                    <CustomSnackbar open={openSuccess}
                                    duration={5000}
                                    handleClose={handleSuccessClose}
                                    message="Created successfully!"
                                    elevation={3}
                                    variant="filled"
                                    severity="success"/>
                </Container>
            )}
        </Formik>
    )
}

export default MovieForm