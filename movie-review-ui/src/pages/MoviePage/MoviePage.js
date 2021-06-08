import {Button, Dialog, DialogTitle, List, makeStyles, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
import {fetchRatedMovieById} from "../../api/moviesApi";
import {useParams} from "react-router-dom";
import ReviewListItemCard from "../../components/dataDisplay/ReviewListItemCard";
import {createReview, fetchReviewsByMovieId} from "../../api/reviewApi";
import MovieMainCard from "../../components/dataDisplay/MovieMainCard/MovieMainCard";
import ReviewDialogForm from "../../components/forms/ReviewDialogForm/ReviewDialogForm";
import CustomSnackbar from "../../components/feedback/CustomSnackbar";

const useStyles = makeStyles((theme) => ({
    cardDetails: {
        flex: 1,
        overflowWrap: "anywhere"
    },
    mainContainer: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    }
}));

const MoviePage = () => {
    const classes = useStyles();
    const [movie, setMovie] = useState({
        title: ''
    });
    const [reviews, setReviews] = useState([]);

    const [openCreateReview, setOpenCreateReview] = useState(false);

    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false);
    };

    const postReview = (data, {setSubmitting}) => {
        setSubmitting(true)

        createReview(data, movie.movieId)
            .then(() => {
                setOpenCreateReview(false)
                    setOpenSuccess(true)
            })
            .catch(() => setOpenError(true))
            .finally(() => {
                setTimeout(() => {
                    setSubmitting(false)
                }, 300)
            })
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
                           releaseDate={movie.releaseYear}
                           description={movie.description}
                           cast={movie.cast} rating={movie.averageRating}/>

            <Button variant="outlined" color="primary" onClick={() => setOpenCreateReview(true)}>
                Leave a review
            </Button>


            <Dialog open={openCreateReview}
                    onClose={() => setOpenCreateReview(false)}
                    aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">Write your review</DialogTitle>

                <ReviewDialogForm handleCloseDialog={() => setOpenCreateReview(false)}
                                  handleOnSubmit={postReview}
                                  handleErrorClose={() => setOpenError(false)} openError={openError}/>

                <CustomSnackbar open={openSuccess}
                                duration={5000}
                                handleClose={handleSuccessClose}
                                message="Review created successfully!"
                                elevation={3}
                                variant="filled"
                                severity="success"/>

            </Dialog>


            <Typography variant="h4" style={{paddingTop: 8}}>
                Reviews
            </Typography>

            <List>
                {reviews.map((review) => (
                    <ReviewListItemCard key={review.reviewId}
                                        username={review.username}
                                        rating={review.rating}
                                        date={review.reviewDate}
                                        content={review.content}/>
                ))}

            </List>

        </main>
    )
}

export default MoviePage