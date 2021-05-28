import {Switch, Route} from "react-router-dom"
import LandingPage from "../../pages/LandingPage/LandingPage";

const Content = () => {

    return (
        <>
            <Switch>
                <Route exact path="/">
                    <LandingPage/>
                </Route>
            </Switch>
        </>
    )
}

export default Content