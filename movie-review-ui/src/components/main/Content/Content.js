import {Switch, Route} from "react-router-dom"
import LandingPage from "../../../pages/LandingPage/LandingPage";
import MovieCreationPage from "../../../pages/MovieCreationPage/MovieCreationPage";
import MoviePage from "../../../pages/MoviePage/MoviePage";

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
                <Route path="/movies/:id" children={<MoviePage/>}/>
            </Switch>
        </>
    )
}

export default Content