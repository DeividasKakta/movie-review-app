import HTTP from "./index";

const fetchReviewsByMovieId = (id) => HTTP.get("/reviews/movie/" + id)

const createReview = (review, params) => HTTP.post("/reviews?movie=" + params, review)

export {fetchReviewsByMovieId, createReview}