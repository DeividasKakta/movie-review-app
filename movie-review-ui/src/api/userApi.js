import HTTP from "./index";


const login = (user) => HTTP.post('/login', user)

export {login}