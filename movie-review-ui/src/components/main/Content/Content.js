import {Switch, Route} from "react-router-dom"
import LandingPage from "../../../pages/LandingPage/LandingPage";
import MovieCreationPage from "../../../pages/MovieCreationPage/MovieCreationPage";
import MoviePage from "../../../pages/MoviePage/MoviePage";
import LoginPage from "../../../pages/LoginPage/LoginPage";
import RegisterPage from "../../../pages/RegisterPage/RegisterPage";

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

                <Route path="/login">
                    <LoginPage/>
                </Route>

                <Route path="/register">
                    <RegisterPage/>
                </Route>

            </Switch>
        </>
    )
}

export default Content