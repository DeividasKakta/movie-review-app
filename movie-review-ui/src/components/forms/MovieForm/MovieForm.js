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
import {useTranslation} from "react-i18next";

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
        .max(100, "validation:movieTitleMax")
        .required("validation:required"),
    description: Yup.string()
        .min(20, "validation:movieDescriptionMin")
        .max(512, "validation:movieDescriptionMax")
        .required("validation:required"),
    cast: Yup.string()
        .min(5, "validation:movieCastMin")
        .max(256, "validation:movieCastMax")
        .required("validation:required"),
    picture: Yup.string()
        .required("validation:required"),
    releaseDate: Yup.mixed()
        .required("validation:required")
})

const MovieForm = () => {
    const classes = useStyles()
    const now = new Date()

    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

    const {t} = useTranslation("forms")

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
                            <CardHeader title={t('createMovieTitle')} titleTypographyProps={{align: "center", variant: "h4"}}
                                        className={classes.mainHeader}/>
                            <CardContent>

                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <OutlinedFormikInput name="title"
                                                             label={t('movieTitle')}
                                                             error={props.touched.title && !!props.errors.title}
                                                             placeholder={t('movieTitlePlaceholder')}/>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormControl error={props.touched.releaseDate && !!props.errors.releaseDate}
                                                     variant="standard" margin="normal">
                                            <Field id="releaseDate"
                                                   name="releaseDate"
                                                   label={t('releaseDate')}
                                                   format="yyyy/MM/dd"
                                                   inputVariant="outlined"
                                                   invalidDateMessage={t('validation:dateError')}
                                                   onChange={val => {
                                                       props.setFieldValue("releaseDate", val);
                                                   }}
                                                   as={KeyboardDatePicker}/>
                                            <ErrorMessage name="releaseDate" component={FormHelperText}>
                                                {
                                                    (msg) => <FormHelperText>{t(msg)}</FormHelperText>
                                                }
                                            </ErrorMessage>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <OutlinedFormikInput name="description"
                                                             label={t('description')}
                                                             error={props.touched.description && !!props.errors.description}
                                                             placeholder={t('descriptionPlaceholder')}
                                                             multiline
                                                             rows={4}/>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <OutlinedFormikInput name="cast"
                                                             label={t('cast')}
                                                             error={props.touched.cast && !!props.errors.cast}
                                                             placeholder={t('castPlaceholder')}
                                                             multiline
                                                             rows={2}/>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <OutlinedFormikInput name="picture"
                                                             label={t('pictureURL')}
                                                             error={props.touched.picture && !!props.errors.picture}
                                                             placeholder={t('pictureURLPlaceholder')}/>
                                    </Grid>

                                </Grid>

                            </CardContent>
                            <CardActions disableSpacing className={classes.cardActions}>

                                <Button variant="contained"
                                        fullWidth
                                        color="secondary"
                                        disabled={props.isSubmitting}
                                        type="submit"
                                >
                                    {t('submit')}
                                </Button>

                            </CardActions>

                        </Card>

                    </Form>

                    <CustomSnackbar open={openError}
                                    duration={5000}
                                    handleClose={handleErrorClose}
                                    message={t('createMovieError')}
                                    elevation={3}
                                    variant="filled"
                                    severity="error"/>

                    <CustomSnackbar open={openSuccess}
                                    duration={5000}
                                    handleClose={handleSuccessClose}
                                    message={t('createMovieSuccess')}
                                    elevation={3}
                                    variant="filled"
                                    severity="success"/>
                </Container>
            )}
        </Formik>
    )
}

export default MovieForm