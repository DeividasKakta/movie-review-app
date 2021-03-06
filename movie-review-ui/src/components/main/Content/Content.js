import {Switch, Route} from "react-router-dom"
import LandingPage from "../../../pages/LandingPage/LandingPage";
import MovieCreationPage from "../../../pages/MovieCreationPage/MovieCreationPage";
import MoviePage from "../../../pages/MoviePage/MoviePage";
import LoginPage from "../../../pages/LoginPage/LoginPage";
import RegisterPage from "../../../pages/RegisterPage/RegisterPage";
import TopMoviesPage from "../../../pages/TopMoviesPage/TopMoviesPage";
import NewestReviewsPage from "../../../pages/NewestReviewsPage/NewestReviewsPage";
import AboutPage from "../../../pages/AboutPage/AboutPage";
import SecuredRoute from "../../security/SecuredRoute/SecuredRoute";
import ErrorPage from "../../../pages/ErrorPage/ErrorPage";
import ActorsPage from "../../../pages/ActorsPage/ActorsPage";
import ActorCreationPage from "../../../pages/ActorCreationPage/ActorCreationPage";

const Content = () => {

    return (
        <>
            <Switch>
                <Route exact path="/">
                    <LandingPage/>
                </Route>

                <SecuredRoute path="/movies/create" roles={["ADMIN"]}>
                    <MovieCreationPage/>
                </SecuredRoute>

                <SecuredRoute path="/movies/edit/:id" roles={["ADMIN"]} children={<MovieCreationPage/>} />

                <SecuredRoute path="/actors/create" roles={["ADMIN"]}>
                    <ActorCreationPage/>
                </SecuredRoute>

                <SecuredRoute path="/actors/edit/:id" roles={["ADMIN"]} children={<ActorCreationPage/>} />

                <Route exact path="/movies/:id" children={<MoviePage/>}/>

                <Route path="/login">
                    <LoginPage/>
                </Route>

                <Route path="/register">
                    <RegisterPage/>
                </Route>

                <Route path="/actors">
                    <ActorsPage/>
                </Route>

                <Route path="/movies/rated/top">
                    <TopMoviesPage/>
                </Route>

                <Route path="/reviews/newest">
                    <NewestReviewsPage/>
                </Route>

                <Route path="/about">
                    <AboutPage/>
                </Route>

                <Route path="*">
                    <ErrorPage/>
                </Route>

                <Route exact path="/error">
                    <ErrorPage/>
                </Route>

            </Switch>
        </>
    )
}

export default Content