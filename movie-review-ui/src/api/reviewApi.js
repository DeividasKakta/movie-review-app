import HTTP from "./index";

const fetchReviewsByMovieId = (id) => HTTP.get("/reviews/movie/" + id)

export {fetchReviewsByMovieId}