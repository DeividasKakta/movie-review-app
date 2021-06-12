import {List, makeStyles, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
import {fetchNewestReviews} from "../../api/reviewApi";
import NewestReviewCard from "../../components/dataDisplay/NewestReviewCard/NewestReviewCard";

const useStyles = makeStyles((theme) => ({
    mainHeader: {
        marginBottom: theme.spacing(3),
    }
}))

const NewestReviewsPage = () => {
    const classes = useStyles()
    const [newestReviews, setNewestReviews] = useState([])

    useEffect(() => {
        fetchNewestReviews()
            .then(({data}) => setNewestReviews(data))
    }, [])

    return (
        <>
            <Typography variant="h1" align="center" className={classes.mainHeader}>Newest reviews</Typography>

            <List>
                {
                    newestReviews?.map((review) => (
                        <NewestReviewCard key={review.reviewId}
                                          username={review.username}
                                          rating={review.rating}
                                          date={review.reviewDate}
                                          content={review.content}
                                          title={review.title}
                                          movieId={review.movieId}
                                          movieTitle={review.movieTitle}/>
                    ))
                }
            </List>
        </>
    )
}

export default NewestReviewsPage