import {Switch, Route} from "react-router-dom"
import LandingPage from "../../../pages/LandingPage/LandingPage";
import MovieCreationPage from "../../../pages/MovieCreationPage/MovieCreationPage";
import MoviePage from "../../../pages/MoviePage/MoviePage";
import LoginPage from "../../../pages/LoginPage/LoginPage";
import RegisterPage from "../../../pages/RegisterPage/RegisterPage";
import TopMoviesPage from "../../../pages/TopMoviesPage/TopMoviesPage";
import NewestReviewsPage from "../../../pages/NewestReviewsPage/NewestReviewsPage";
import AboutPage from "../../../pages/AboutPage/AboutPage";

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

                <Route exact path="/movies/:id" children={<MoviePage/>}/>

                <Route path="/login">
                    <LoginPage/>
                </Route>

                <Route path="/register">
                    <RegisterPage/>
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

            </Switch>
        </>
    )
}

export default Content