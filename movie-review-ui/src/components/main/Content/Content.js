import {Switch, Route} from "react-router-dom"
import LandingPage from "../../../pages/LandingPage/LandingPage";
import MovieCreationPage from "../../../pages/MovieCreationPage/MovieCreationPage";

const Content = () => {

    return (
        <>
            <Switch>
                <Route exact path="/">
                    <LandingPage/>
                </Route>
                <Route path="/movies/create">
                    <MovieCreationPage/>
                </Route>
            </Switch>
        </>
    )
}

export default Content