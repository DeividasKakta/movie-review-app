import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Divider,
    Link,
    List,
    makeStyles,
    Typography
} from "@material-ui/core";
import {useEffect, useState} from "react";
import {fetchRatedMovieById} from "../../api/moviesApi";
import {NavLink, useLocation, useParams} from "react-router-dom";
import ReviewListItemCard from "../../components/dataDisplay/ReviewListItemCard/ReviewListItemCard";
import {createReview, deleteReview, editReview, fetchReviewsByMovieId} from "../../api/reviewApi";
import MovieMainCard from "../../components/dataDisplay/MovieMainCard/MovieMainCard";
import ReviewDialogForm from "../../components/forms/ReviewDialogForm/ReviewDialogForm";
import CustomSnackbar from "../../components/feedback/CustomSnackbar";
import {useSelector} from "react-redux";
import {loggedInUser} from "../../store/slices/userSlice";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
    cardDetails: {
        flex: 1,
        overflowWrap: "anywhere"
    },
    mainContainer: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(1)
    },
    divider: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(1)
    },
    reviewButton: {
        display: "inline-block"
    },
    loginErrorItem: {
        display: "inline-block",
        marginLeft: theme.spacing(1)
    },
    reviewDialogTitle: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        textAlign: "center"
    }
}));

const MoviePage = () => {
    const classes = useStyles()
    const location = useLocation()
    const currentUser = useSelector(loggedInUser)

    const {t} = useTranslation("moviePage")

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
    const [openDeleteSuccess, setOpenDeleteSuccess] = useState(false);
    const [openDeleteError, setOpenDeleteError] = useState(false);

    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false);
        setOpenEditSuccess(false);
        setOpenDeleteSuccess(false);
        setOpenDeleteError(false);
    };

    const postReview = (data) => {

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
    }

    const handleEditReviewClick = (review) => {
        setEditableReview(review)

        setOpenEditReview(true)
    }

    const postEditReview = (data) => {

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

    }

    const postDeleteReview = ({reviewId, username: reviewUsername}) => {

        deleteReview(reviewId, reviewUsername)
            .then(() => {
                setOpenDeleteReview(false)

                fetchRatedMovieById(id)
                    .then(({data}) => setMovie(data))

                fetchReviewsByMovieId(id)
                    .then(({data}) => {
                        setReviews(data)
                        setOpenDeleteSuccess(true)
                    })
            })
            .catch(() => setOpenDeleteError(true))

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
                           picture={movie.picture}
            />

            <div>
                
            </div>

            <Typography variant="h4" style={{paddingTop: 8}}>
                {t('reviews')}
            </Typography>

            <Divider className={classes.divider}/>

            {
                currentUser ?
                    <Button variant="outlined" color="secondary" onClick={() => setOpenCreateReview(true)}>
                        {t('leaveReview')}
                    </Button> :
                    <div>
                        <Button variant="outlined" color="secondary" className={classes.reviewButton} disabled>
                            {t('leaveReview')}
                        </Button>
                        <Link variant="subtitle1"
                              color="secondary"
                              className={classes.loginErrorItem}
                              to={{
                                  pathname: "/login",
                                  state: {
                                      from: location
                                  }
                              }}
                              component={NavLink}>
                            {t('loginToReview')}
                        </Link>
                    </div>

            }

            <List>
                {reviews.map((review) => (
                    <ReviewListItemCard key={review.reviewId}
                                        username={review.username}
                                        rating={review.rating}
                                        date={review.reviewDate}
                                        content={review.content}
                                        title={review.title}
                                        handleOnEditReview={() => handleEditReviewClick(review)}
                                        handleOnDeleteReview={() => handleDeleteReviewClick(review)}
                    />
                ))}
            </List>

            <Dialog open={openCreateReview}
                    onClose={() => setOpenCreateReview(false)}
                    aria-labelledby="create-review"
            >
                <DialogTitle id="create-review" className={classes.reviewDialogTitle}>
                    {t('writeReview')}
                </DialogTitle>

                <ReviewDialogForm handleCloseDialog={() => setOpenCreateReview(false)}
                                  handleOnSubmit={postReview}
                                  errorMessage={t('createReviewError')}
                                  handleErrorClose={() => setOpenError(false)}
                                  openError={openError}
                />
            </Dialog>

            <Dialog open={openEditReview}
                    onClose={() => setOpenEditReview(false)}
                    aria-labelledby="edit-review"
            >
                <DialogTitle id="edit-review" className={classes.reviewDialogTitle}>
                    {t('editReview')}
                </DialogTitle>

                <ReviewDialogForm handleCloseDialog={() => setOpenEditReview(false)}
                                  handleOnSubmit={postEditReview}
                                  handleErrorClose={() => setOpenError(false)}
                                  openError={openError}
                                  errorMessage={t('updateReviewError')}
                                  title={editableReview.title}
                                  content={editableReview.content}
                                  rating={editableReview.rating}
                />
            </Dialog>

            <Dialog
                open={openDeleteReview}
                onClose={() => setOpenDeleteReview(false)}
                aria-labelledby="delete-review"
            >
                <DialogTitle id="delete-review">
                    {t('deleteThisReview')}
                </DialogTitle>

                <DialogActions>
                    <Button onClick={() => setOpenDeleteReview(false)} color="primary" autoFocus>
                        {t('cancel')}
                    </Button>
                    <Button onClick={() => postDeleteReview(deletableReview)} color="primary">
                        {t('delete')}
                    </Button>
                </DialogActions>
            </Dialog>

            <CustomSnackbar open={openSuccess}
                            duration={5000}
                            handleClose={handleSuccessClose}
                            message={t('reviewCreateSuccess')}
                            elevation={3}
                            variant="filled"
                            severity="success"
            />

            <CustomSnackbar open={openEditSuccess}
                            duration={5000}
                            handleClose={handleSuccessClose}
                            message={t('reviewUpdateSuccess')}
                            elevation={3}
                            variant="filled"
                            severity="success"
            />

            <CustomSnackbar open={openDeleteSuccess}
                            duration={5000}
                            handleClose={handleSuccessClose}
                            message={t('reviewDeleteSuccess')}
                            elevation={3}
                            variant="filled"
                            severity="success"
            />

            <CustomSnackbar open={openDeleteError}
                            duration={5000}
                            handleClose={handleSuccessClose}
                            message={t('deleteReviewError')}
                            elevation={3}
                            variant="filled"
                            severity="error"
            />

        </main>
    )
}

export default MoviePage