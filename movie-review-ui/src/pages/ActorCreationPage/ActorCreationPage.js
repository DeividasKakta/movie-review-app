import {makeStyles} from "@material-ui/core";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {fetchActorById} from "../../api/actorsApi";
import ActorForm from "../../components/forms/ActorForm/ActorForm";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        marginTop: theme.spacing(4)
    }
}))

const ActorCreationPage = () => {
    const classes = useStyles()

    const [actor, setActor] = useState(null)

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            fetchActorById(id)
                .then(({data}) => setActor(data))
        }
    }, [id])

    return (
        <>
            <main className={classes.mainContainer}>
                <ActorForm actor={actor}/>
            </main>
        </>
    )
}

export default ActorCreationPage