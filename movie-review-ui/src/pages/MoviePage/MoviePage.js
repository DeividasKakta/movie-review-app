import {Button, Dialog, DialogActions, DialogTitle, Divider, List, makeStyles, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
import {fetchRatedMovieById} from "../../api/moviesApi";
import {useParams} from "react-router-dom";
import ReviewListItemCard from "../../components/dataDisplay/ReviewListItemCard";
import {createReview, deleteReview, editReview, fetchReviewsByMovieId} from "../../api/reviewApi";
import MovieMainCard from "../../components/dataDisplay/MovieMainCard/MovieMainCard";
import ReviewDialogForm from "../../components/forms/ReviewDialogForm/ReviewDialogForm";
import CustomSnackbar from "../../components/feedback/CustomSnackbar";
import {useSelector} from "react-redux";
import {loggedInUser} from "../../store/slices/userSlice";

const useStyles = makeStyles((theme) => ({
    cardDetails: {
        flex: 1,
        overflowWrap: "anywhere"
    },
    mainContainer: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    divider: {
        marginBottom: theme.spacing(2)
    }
}));

const MoviePage = () => {
    const classes = useStyles();
    const [movie, setMovie] = useState({title: ''});
    const [reviews, setReviews] = useState([]);
    const [editableReview, setEditableReview] = useState({});
    const [deletableReview, setDeletableReview] = useState({});

    const [openCreateReview, setOpenCreateReview] = useState(false);
    const [openEditReview, setOpenEditReview] = useState(false);
    const [openDeleteReview, setOpenDeleteReview] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openEditSuccess, setOpenEditSuccess] = useState(false);

    const currentUser = useSelector(loggedInUser)

    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false);
        setOpenEditSuccess(false);
    };

    const postReview = (data, {setSubmitting}) => {
        setSubmitting(true)

        createReview(data, movie.movieId)
            .then(() => {
                setOpenCreateReview(false)

                fetchRatedMovieById(id)
                    .then(({data}) => setMovie(data))

                fetchReviewsByMovieId(id)
                    .then(({data}) => {
                        setReviews(data)
                        setOpenSuccess(true)
                    })
            })
            .catch(() => setOpenError(true))
            .finally(() => {
                setTimeout(() => {
                    setSubmitting(false)
                }, 300)
            })
    }

    const handleEditReviewClick = (review) => {
        setEditableReview(review)

        setOpenEditReview(true)
    }

    const postEditReview = (data, {setSubmitting}) => {
        setSubmitting(true)

        editReview(data, editableReview.reviewId)
            .then(() => {
                setOpenEditReview(false)

                fetchRatedMovieById(id)
                    .then(({data}) => setMovie(data))

                fetchReviewsByMovieId(id)
                    .then(({data}) => {
                        setReviews(data)
                        setOpenEditSuccess(true)
                    })
            })
            .catch(() => setOpenError(true))
            .finally(() => {
                setTimeout(() => {
                    setSubmitting(false)
                }, 300)
            })
    }

    const postDeleteReview = (review) => {
        let reviewId = review.reviewId
        let reviewUsername = review.username

        deleteReview(reviewId, reviewUsername)
            .then(() => {
                setOpenDeleteReview(false)

                fetchRatedMovieById(id)
                    .then(({data}) => setMovie(data))

                fetchReviewsByMovieId(id)
                    .then(({data}) => {
                        setReviews(data)
                        setOpenEditSuccess(true) // change msg
                    })
            })
            .catch(() => setOpenError(true))

    }

    const handleDeleteReviewClick = (review) => {
        setDeletableReview(review)
        setOpenDeleteReview(true)
    }

    const {id} = useParams();
    useEffect(() => {
        fetchRatedMovieById(id)
            .then(({data}) => setMovie(data))

        fetchReviewsByMovieId(id)
            .then(({data}) => setReviews(data))

    }, [id])

    return (
        <main className={classes.mainContainer}>

            <MovieMainCard title={movie.title}
                           releaseDate={movie.releaseDate}
                           description={movie.description}
                           cast={movie.cast}
                           rating={movie.averageRating}
                           picture={movie.picture}/>

            <Dialog open={openCreateReview}
                    onClose={() => setOpenCreateReview(false)}
                    aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">Write your review</DialogTitle>

                <ReviewDialogForm handleCloseDialog={() => setOpenCreateReview(false)}
                                  handleOnSubmit={postReview}
                                  handleErrorClose={() => setOpenError(false)}
                                  openError={openError}/>

            </Dialog>

            <CustomSnackbar open={openSuccess}
                            duration={5000}
                            handleClose={handleSuccessClose}
                            message="Review created successfully!"
                            elevation={3}
                            variant="filled"
                            severity="success"/>

            <CustomSnackbar open={openEditSuccess}
                            duration={5000}
                            handleClose={handleSuccessClose}
                            message="Review updated successfully!"
                            elevation={3}
                            variant="filled"
                            severity="success"/>

            <Typography variant="h4" style={{paddingTop: 8}}>
                Reviews
            </Typography>

            <Divider className={classes.divider} />

            {
                currentUser ?
                    <Button variant="outlined" color="secondary" onClick={() => setOpenCreateReview(true)}>
                        Leave a review
                    </Button> :
                    <>
                        <Button variant="outlined" color="secondary" disabled>
                            Leave a review
                        </Button>
                        <Typography variant="subtitle1" color="secondary">Login to leave a review</Typography>
                    </>

            }

            <Dialog open={openEditReview}
                    onClose={() => setOpenEditReview(false)}
                    aria-labelledby="edit-review">

                <DialogTitle id="edit-review">Edit your review</DialogTitle>

                <ReviewDialogForm handleCloseDialog={() => setOpenEditReview(false)}
                                  handleOnSubmit={postEditReview}
                                  handleErrorClose={() => setOpenError(false)}
                                  openError={openError}
                                  errorMessage="Error updating review"
                                  content={editableReview.content}
                                  rating={editableReview.rating}/>

            </Dialog>


            <Dialog
                open={openDeleteReview}
                onClose={() => setOpenDeleteReview(false)}
                aria-labelledby="delete-review"
            >
                <DialogTitle id="delete-review">{"Delete this review?"}</DialogTitle>

                <DialogActions>
                    <Button onClick={() => setOpenDeleteReview(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => postDeleteReview(deletableReview)} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>


            <List>
                {reviews.map((review) => (
                    <ReviewListItemCard key={review.reviewId}
                                        username={review.username}
                                        rating={review.rating}
                                        date={review.reviewDate}
                                        content={review.content}
                                        title={review.title}
                                        handleOnEditReview={() => handleEditReviewClick(review)}
                                        handleOnDeleteReview={() => handleDeleteReviewClick(review)}/>
                ))}

            </List>

        </main>
    )
}

export default MoviePage