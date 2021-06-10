import HTTP from "./index";

const login = (user) => HTTP.post('/login', user)

const register = (newUser) => HTTP.post('/register', newUser)

export {login, register}