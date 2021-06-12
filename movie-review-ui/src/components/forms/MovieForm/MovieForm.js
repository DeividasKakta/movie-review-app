import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Container,
    FormControl,
    FormHelperText,
    Grid,
    makeStyles
} from "@material-ui/core";
import {KeyboardDatePicker} from "@material-ui/pickers";
import {createMovie} from "../../../api/moviesApi";
import CustomSnackbar from "../../feedback/CustomSnackbar";
import {useState} from "react";
import OutlinedFormikInput from "../../inputs/OutlinedFormikInput";

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
    title: Yup.string()
        .max(100, "Must not exceed 100 symbols")
        .required("Field is required"),
    description: Yup.string()
        .min(20, "Description can not be shorter than 20 symbols")
        .max(512, "Description can not be longer than 512 symbols")
        .required("Field is required"),
    cast: Yup.string()
        .min(5, "Cast can not be shorter than 5 symbols")
        .max(256, "Cast can not be longer than 256 symbols")
        .required("Field is required"),
    picture: Yup.string()
        .required("Field is required")
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
            releaseDate: now,
            picture: ''
        }}
                onSubmit={postForm}
                validationSchema={validationSchema}
        >
            {props => (
                <Container maxWidth="sm">
                    <Form>
                        <Card className={classes.mainCard}>
                            <CardHeader title="Add new movie" titleTypographyProps={{align: "center", variant: "h4"}}
                                        className={classes.mainHeader}/>
                            <CardContent>

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

                                    <Grid item xs={12}>
                                        <OutlinedFormikInput name="picture"
                                                             label="Picture URL"
                                                             error={props.touched.picture && !!props.errors.picture}
                                                             placeholder="Enter movie picture URL..."/>
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