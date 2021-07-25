import {
    CardMedia, makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography, withStyles
} from "@material-ui/core";
import moment from "moment";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {fetchActors} from "../../api/actorsApi";

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
        cursor: "pointer"
    },
    tableCell: {
        fontSize: theme.spacing(3),
    },
    imageCell: {
        padding: theme.spacing(0.5),
    },
    ratingCell: {
        color: theme.palette.secondary.dark
    }
}))

const ActorsPage = () => {
    const classes = useStyles()
    const {t} = useTranslation("pages")

    const [actors, setActors] = useState([])

    useEffect(() => {
        fetchActors()
            .then(({data}) => setActors(data))
    }, [])

    return (
        <>
            <Typography variant="h1" align="center" className={classes.mainHeader}>
                {t('actors')}
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell colSpan={2} align="left">
                                {t('actorSurname')}
                            </StyledTableCell>

                            <StyledTableCell align="left">
                                {t('actorName')}
                            </StyledTableCell>

                            <StyledTableCell align="right">
                                {t('actorBirthdate')}
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {actors.map((actor) => (
                            <TableRow key={actor.id}
                                      hover
                                      className={classes.tableRow}>
                                <TableCell className={classes.imageCell}>
                                    <CardMedia className={classes.cardMedia} image={actor.photo}
                                               title={actor.surname}/>
                                </TableCell>

                                <TableCell align="left" className={classes.tableCell}>
                                    {actor.surname}
                                </TableCell>

                                <TableCell align="right" className={classes.tableCell}>
                                    {actor.name}
                                </TableCell>

                                <TableCell align="right" className={`${classes.tableCell} ${classes.ratingCell}`}>
                                    {
                                        moment(actor.birthDate)?.format("YYYY-mm-DD")
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default ActorsPage