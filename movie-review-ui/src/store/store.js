import {configureStore} from "@reduxjs/toolkit";
import user, {loadUserFromSessionStorage, subscribeToUserChanges} from "./slices/userSlice"

const constructStore = () => {

    const store = configureStore({
        reducer: {
            user
        },
        preloadedState: {
            user: loadUserFromSessionStorage()
        }
    })

    subscribeToUserChanges(store)

    return store
}

const store = constructStore()

export default store