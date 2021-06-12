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

const validationSchema = Yup.object().shape({
    content: Yup.string()
        .min(5, "Content must be at least 5 symbols long")
        .max(1000, "Content must be at least 5 symbols long")
        .required("Field can not be empty"),
    title: Yup.string()
        .min(5, "Title must be at least 5 symbols long")
        .max(100, "Title must be at least 5 symbols long")
        .required("Field can not be empty"),
    rating: Yup.number()
        .min(1, "Minimum rating is 1")
        .max(10, "Maximum rating is 10")
        .required("Field can not be empty")
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
                                                     label="Title"
                                                     error={props.touched.title && !!props.errors.title}
                                                     placeholder="Enter your review title..."/>
                            </Grid>

                            <Grid item xs={12}>
                                <OutlinedFormikInput name="content"
                                                     label="Content"
                                                     multiline
                                                     rows={10}
                                                     error={props.touched.content && !!props.errors.content}
                                                     placeholder="Enter your review text..."/>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl error={props.touched.rating && !!props.errors.rating}
                                             variant="outlined"
                                             style={{width: '30%'}}
                                             margin="normal">
                                    <InputLabel htmlFor="rating">Rating</InputLabel>
                                    <Field id="rating" name="rating" label="Rating" as={Select}>

                                        {ratingArray.map((number) => (
                                            <MenuItem key={number} value={number}>{number}</MenuItem>
                                        ))}
                                    </Field>

                                    <ErrorMessage name="rating" component={FormHelperText}/>
                                </FormControl>
                            </Grid>

                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Cancel
                        </Button>

                        <Button variant="contained"
                                color="secondary"
                                type="submit">Submit</Button>

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