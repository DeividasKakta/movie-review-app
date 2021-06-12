import {ErrorMessage, Field, Form, Formik} from "formik";
import {
    Button,
    DialogActions,
    DialogContent,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select
} from "@material-ui/core";
import OutlinedFormikInput from "../../inputs/OutlinedFormikInput";
import * as Yup from "yup";
import CustomSnackbar from "../../feedback/CustomSnackbar";
import {useTranslation} from "react-i18next";

const validationSchema = Yup.object().shape({
    content: Yup.string()
        .min(5, "validation:contentMin")
        .max(1000, "validation:contentMax")
        .required("validation:required"),
    title: Yup.string()
        .min(5, "validation:titleMin")
        .max(100, "validation:titleMax")
        .required("validation:required"),
    rating: Yup.number()
        .min(1, "validation:ratingMin")
        .max(10, "validation:ratingMax")
        .required("validation:required")
})

const ReviewDialogForm = ({
                              content = '',
                              rating = '',
                              title = '',
                              handleCloseDialog,
                              handleOnSubmit,
                              openError,
                              handleErrorClose,
                              errorMessage = 'Unexpected error'
                          }) => {
    const ratingArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const {t} = useTranslation("forms")

    return (
        <Formik initialValues={{
            content: content,
            rating: rating,
            title: title
        }}
                onSubmit={handleOnSubmit}
                validationSchema={validationSchema}
        >
            {props => (
                <Form>

                    <DialogContent style={{width: 450}}>

                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <OutlinedFormikInput name="title"
                                                     label={t('reviewTitle')}
                                                     error={props.touched.title && !!props.errors.title}
                                                     placeholder={t('reviewTitlePlaceholder')}/>
                            </Grid>

                            <Grid item xs={12}>
                                <OutlinedFormikInput name="content"
                                                     label={t('content')}
                                                     multiline
                                                     rows={10}
                                                     error={props.touched.content && !!props.errors.content}
                                                     placeholder={t('contentPlaceholder')}/>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl error={props.touched.rating && !!props.errors.rating}
                                             variant="outlined"
                                             style={{width: '30%'}}
                                             margin="normal">
                                    <InputLabel htmlFor="rating">{t('rating')}</InputLabel>
                                    <Field id="rating" name="rating" label={t('rating')} as={Select}>

                                        {ratingArray.map((number) => (
                                            <MenuItem key={number} value={number}>{number}</MenuItem>
                                        ))}
                                    </Field>

                                    <ErrorMessage name="rating" component={FormHelperText}>
                                        {
                                            (msg) => <FormHelperText>{t(msg)}</FormHelperText>
                                        }
                                    </ErrorMessage>
                                </FormControl>
                            </Grid>

                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            {t('cancel')}
                        </Button>

                        <Button variant="contained"
                                color="secondary"
                                type="submit"
                        >
                            {t('submit')}
                        </Button>

                    </DialogActions>

                    <CustomSnackbar open={openError}
                                    duration={5000}
                                    handleClose={handleErrorClose}
                                    message={errorMessage}
                                    elevation={3}
                                    variant="filled"
                                    severity="error"/>

                </Form>
            )}
        </Formik>
    )
}

export default ReviewDialogForm