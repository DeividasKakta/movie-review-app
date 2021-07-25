import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    withStyles
} from "@material-ui/core";
import moment from "moment";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {deleteActor, fetchActors} from "../../api/actorsApi";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {loggedInUser} from "../../store/slices/userSlice";
import CustomSnackbar from "../../components/feedback/CustomSnackbar";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontSize: theme.spacing(2)
    }
}))(TableCell);

const useStyles = makeStyles((theme) => ({
    cardMedia: {
        width: theme.spacing(8),
        height: theme.spacing(10),
    },
    mainHeader: {
        marginBottom: theme.spacing(3),
    },
    tableRow: {
        textDecoration: 0,
    },
    tableCell: {
        fontSize: theme.spacing(3),
    },
    imageCell: {
        padding: theme.spacing(0.5),
    },
    ratingCell: {
        color: theme.palette.secondary.dark
    },
    deleteButton: {
        color: theme.palette.error.main,
        borderColor: theme.palette.error.main,
        marginLeft: theme.spacing(2)
    },
    buttonColor: {
        color: theme.palette.secondary.dark,
        borderColor: theme.palette.secondary.dark,
    }
}))

const ActorsPage = () => {
    const classes = useStyles()
    const {t} = useTranslation("pages")
    const currentUser = useSelector(loggedInUser)

    const [actors, setActors] = useState([])
    const [openDeleteActor, setOpenDeleteActor] = useState(false)
    const [deletableActorId, setDeletableActorId] = useState()
    const [openDeleteSuccess, setOpenDeleteSuccess] = useState(false)
    const [openDeleteError, setOpenDeleteError] = useState(false)

    useEffect(() => {
        fetchActors()
            .then(({data}) => setActors(data))
    }, [])

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenDeleteSuccess(false);
        setOpenDeleteError(false);
    };

    const initiateActorDelete = (id) => {
        setDeletableActorId(id);
        setOpenDeleteActor(true);
    }

    const postDeleteActor = () => {

        deleteActor(deletableActorId)
            .then(() => {
                setOpenDeleteActor(false)

                fetchActors()
                    .then(({data}) => {
                        setActors(data)
                        setOpenDeleteSuccess(true)
                    })
            })
            .catch(() => setOpenDeleteError(true))
    }

    return (
        <>
            <Typography variant="h1" align="center" className={classes.mainHeader}>
                {t('actors')}
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">
                                {t('actorSurname')}
                            </StyledTableCell>

                            <StyledTableCell align="left">
                                {t('actorName')}
                            </StyledTableCell>

                            <StyledTableCell align="right">
                                {t('actorBirthdate')}
                            </StyledTableCell>

                            {
                                currentUser?.roles?.includes("ADMIN") &&
                                <>
                                    <StyledTableCell align="right">
                                        {t('actions')}
                                    </StyledTableCell>
                                </>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {actors.map((actor) => (
                            <TableRow key={actor.id}
                                      className={classes.tableRow}>

                                <TableCell align="left" className={classes.tableCell}>
                                    {actor.surname}
                                </TableCell>

                                <TableCell align="left" className={classes.tableCell}>
                                    {actor.name}
                                </TableCell>

                                <TableCell align="right" className={`${classes.tableCell} ${classes.ratingCell}`}>
                                    {
                                        moment(actor.birthDate)?.format("YYYY-MM-DD")
                                    }
                                </TableCell>

                                {
                                    currentUser?.roles?.includes("ADMIN") &&
                                    <>
                                        <TableCell align="right"
                                                   className={`${classes.tableCell} ${classes.ratingCell}`}>
                                            <Button variant="outlined" className={classes.buttonColor}
                                                    to={"/actors/edit/" + actor.id}
                                                    component={NavLink}>
                                                {t('editActor')}
                                            </Button>
                                            <Button variant="outlined" className={classes.deleteButton}
                                                    onClick={() => initiateActorDelete(actor.id)}>
                                                {t('removeActor')}
                                            </Button>
                                        </TableCell>
                                    </>
                                }

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={openDeleteActor}
                onClose={() => setOpenDeleteActor(false)}
                aria-labelledby="delete-actor"
            >
                <DialogTitle id="delete-actor">
                    {t('deleteThisActor')}
                </DialogTitle>

                <DialogActions>
                    <Button onClick={() => setOpenDeleteActor(false)} color="primary" autoFocus>
                        {t('cancel')}
                    </Button>
                    <Button onClick={() => postDeleteActor()} color="primary">
                        {t('delete')}
                    </Button>
                </DialogActions>
            </Dialog>

            <CustomSnackbar open={openDeleteSuccess}
                            duration={5000}
                            handleClose={handleSnackbarClose}
                            message={t('actorDeleteSuccess')}
                            elevation={3}
                            variant="filled"
                            severity="success"
            />

            <CustomSnackbar open={openDeleteError}
                            duration={5000}
                            handleClose={handleSnackbarClose}
                            message={t('actorDeleteError')}
                            elevation={3}
                            variant="filled"
                            severity="error"
            />

        </>
    )
}

export default ActorsPage