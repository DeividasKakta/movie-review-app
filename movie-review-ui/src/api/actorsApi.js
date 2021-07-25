import HTTP from "./index";

const fetchActors = () => HTTP.get('/actors')

const createActor = (actor) => HTTP.post('/actors', actor)

const editActor = (actor, uuid) => HTTP.put('/actors/' + uuid, actor)

const deleteActor = (id) => HTTP.delete('/actors/' + id)

export { fetchActors, createActor, editActor, deleteActor}
