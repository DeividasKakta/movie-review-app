import HTTP from "./index";

const fetchReviewsByMovieId = (id) => HTTP.get("/reviews/movie/" + id)

const createReview = (review, params) => HTTP.post("/reviews?movie=" + params, review)

const editReview = (review, params) => HTTP.put("/reviews/" + params, review)

const deleteReview = (params) => HTTP.delete("/reviews/" + params)

export {fetchReviewsByMovieId, createReview, editReview, deleteReview}