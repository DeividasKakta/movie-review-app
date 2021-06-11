import HTTP from "./index";

const fetchReviewsByMovieId = (id) => HTTP.get("/reviews/movie/" + id)

const fetchNewestReviews = () => HTTP.get('/reviews/newest')

const createReview = (review, params) => HTTP.post("/reviews?movie=" + params, review)

const editReview = (review, params) => HTTP.put("/reviews/" + params, review)

const deleteReview = (reviewId, reviewUsername) => HTTP.delete("/reviews/" + reviewId + "?user=" + reviewUsername)

export {fetchReviewsByMovieId, createReview, editReview, deleteReview, fetchNewestReviews}