import {List, makeStyles, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
import {fetchMovieById} from "../../api/moviesApi";
import {useParams} from "react-router-dom";
import ReviewListItemCard from "../../components/dataDisplay/ReviewListItemCard";
import {fetchReviewsByMovieId} from "../../api/reviewApi";
import MovieMainCard from "../../components/dataDisplay/MovieMainCard/MovieMainCard";

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

    const {id} = useParams();

    useEffect(() => {
        fetchMovieById(id)
            .then(({data}) => setMovie(data))

        fetchReviewsByMovieId(id)
            .then(({data}) => setReviews(data))

    }, [id])

    return (
        <main className={classes.mainContainer}>

            <MovieMainCard title={movie.title}
                           releaseDate={movie.releaseDate}
                           description={movie.description}
                           cast={movie.cast}/>

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