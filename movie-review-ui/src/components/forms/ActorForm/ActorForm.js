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
import * as Yup from "yup";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {createActor, editActor} from "../../../api/actorsApi";
import {ErrorMessage, Field, Form, Formik} from "formik";
import OutlinedFormikInput from "../../inputs/OutlinedFormikInput";
import {KeyboardDatePicker} from "@material-ui/pickers";
import CustomSnackbar from "../../feedback/CustomSnackbar";


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
    name: Yup.string()
        .max(50, "validation:actorNameMax")
        .required("validation:required"),
    surname: Yup.string()
        .max(50, "validation:actorSurnameMax")
        .required("validation:required"),
    birthDate: Yup.mixed()
        .required("validation:required")
})

const ActorForm = ({actor}) => {
    const classes = useStyles()
    const now = new Date()
    const {t} = useTranslation("forms")

    const [openCreateError, setOpenCreateError] = useState(false);
    const [openEditError, setOpenEditError] = useState(false);
    const [openCreateSuccess, setOpenCreateSuccess] = useState(false);
    const [openEditSuccess, setOpenEditSuccess] = useState(false);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenCreateError(false)
        setOpenEditError(false)
        setOpenCreateSuccess(false)
        setOpenEditSuccess(false)
    };

    const postNewActor = (data, {setSubmitting}) => {
        setSubmitting(true)

        createActor(data)
            .then(() => setOpenCreateSuccess(true))
            .catch(() => setOpenCreateError(true))
            .finally(() => {
                setTimeout(() => {
                    setSubmitting(false)
                }, 300)
            })
    }

    const postEditActor = (data, {setSubmitting}) => {
        setSubmitting(true)
        const uuid = actor?.id

        editActor(data, uuid)
            .then(() => setOpenEditSuccess(true))
            .catch(() => setOpenEditError(true))
            .finally(() => {
                setTimeout(() => {
                    setSubmitting(false)
                }, 300)
            })
    }

    return (
        <Formik initialValues={{
            name: actor?.name || '',
            surname: actor?.surname || '',
            birthDate: actor?.birthDate || now
        }}
                onSubmit={
                    actor ?
                        postEditActor :
                        postNewActor
                }
                validationSchema={validationSchema}
                enableReinitialize={true}
        >
            {props => (
                <Container maxWidth="sm">
                    <Form>
                        <Card className={classes.mainCard}>
                            <CardHeader title={
                                actor ?
                                    t('editActorTitle') :
                                    t('createActorTitle')
                            }
                                        titleTypographyProps={{align: "center", variant: "h4"}}
                                        className={classes.mainHeader}/>
                            <CardContent>

                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <OutlinedFormikInput name="name"
                                                             label={t('actorName')}
                                                             error={props.touched.name && !!props.errors.name}
                                                             placeholder={t('actorNamePlaceholder')}/>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <OutlinedFormikInput name="surname"
                                                             label={t('actorSurname')}
                                                             error={props.touched.surname && !!props.errors.surname}
                                                             placeholder={t('actorSurnamePlaceholder')}/>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl error={props.touched.birthDate && !!props.errors.birthDate}
                                                     variant="standard" margin="normal">
                                            <Field id="birthDate"
                                                   name="birthDate"
                                                   label={t('actorBirthDate')}
                                                   format="yyyy/MM/dd"
                                                   inputVariant="outlined"
                                                   invalidDateMessage={t('validation:actorDateError')}
                                                   onChange={val => {
                                                       props.setFieldValue("birthDate", val);
                                                   }}
                                                   as={KeyboardDatePicker}/>
                                            <ErrorMessage name="birthDate" component={FormHelperText}>
                                                {
                                                    (msg) => <FormHelperText>{t(msg)}</FormHelperText>
                                                }
                                            </ErrorMessage>
                                        </FormControl>
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

                    <CustomSnackbar open={openCreateError}
                                    duration={5000}
                                    handleClose={handleSnackbarClose}
                                    message={t('createActorError')}
                                    elevation={3}
                                    variant="filled"
                                    severity="error"/>

                    <CustomSnackbar open={openCreateSuccess}
                                    duration={5000}
                                    handleClose={handleSnackbarClose}
                                    message={t('createActorSuccess')}
                                    elevation={3}
                                    variant="filled"
                                    severity="success"/>

                    <CustomSnackbar open={openEditError}
                                    duration={5000}
                                    handleClose={handleSnackbarClose}
                                    message={t('updateActorError')}
                                    elevation={3}
                                    variant="filled"
                                    severity="error"/>

                    <CustomSnackbar open={openEditSuccess}
                                    duration={5000}
                                    handleClose={handleSnackbarClose}
                                    message={t('updateActorSuccess')}
                                    elevation={3}
                                    variant="filled"
                                    severity="success"/>
                </Container>
            )}
        </Formik>
    )
}

export default ActorForm