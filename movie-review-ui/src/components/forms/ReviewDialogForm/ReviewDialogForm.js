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
        .min(5)
        .max(1000)
        .required(),
    rating: Yup.number()
        .min(1)
        .max(10)
        .required()
})

const ReviewDialogForm = ({content = '', rating = '', handleCloseDialog, handleOnSubmit, openError, handleErrorClose, errorMessage = 'Unexpected error'}) => {
    const ratingArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <Formik initialValues={{
            content: content,
            rating: rating,
        }}
                onSubmit={handleOnSubmit}
                validationSchema={validationSchema}
        >
            {props => (
                <Form>

                    <DialogContent style={{width: 450}}>


                        <Grid container spacing={2}>
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
                                color="primary"
                                type="submit"
                                disabled={props.isSubmitting}>Submit</Button>

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