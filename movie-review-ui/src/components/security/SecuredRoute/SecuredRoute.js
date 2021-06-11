import {Route, Redirect, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import _ from "lodash"
import {loggedInUser} from "../../../store/slices/userSlice";

const SecuredRoute = ({roles, ...props}) => {
    const userRoles = useSelector(loggedInUser)?.roles
    const authorized = !!_.intersection(userRoles, roles).length
    const location = useLocation()

    return (
        authorized ? <Route {...props}/> : <Redirect to={{
            pathname: "/login",
            state: {
                from: location
            }
        }}/>
    )
}

export default SecuredRoute