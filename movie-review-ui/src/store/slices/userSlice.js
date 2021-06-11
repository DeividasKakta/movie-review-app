import {createSlice} from "@reduxjs/toolkit";
import {loadFromSessionStorage, removeItemFromSessionStorage, saveToSessionStorage} from "../../utils/sessionStorage";


const initialState = {
    loggedInUser: null,
    jwt: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(user, { payload }) {
            return payload
        },
        logout() {
            removeItemFromSessionStorage('user')
            return initialState
        }
    }
})

let prevUser = initialState

export const subscribeToUserChanges = (store) => {

    store.subscribe(() => {
        const currentUser = store.getState().user

        if (prevUser !== currentUser) {
            prevUser = currentUser
            saveToSessionStorage("user", currentUser)
        }
    })
}

export const loadUserFromSessionStorage = () => loadFromSessionStorage("user") || undefined

export const loggedInUser = ( { user } ) => user.loggedInUser

export default userSlice.reducer
export const { login, logout } = userSlice.actions
