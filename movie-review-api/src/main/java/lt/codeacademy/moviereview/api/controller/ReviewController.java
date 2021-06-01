package lt.codeacademy.moviereview.api.controller;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.moviereview.api.model.entity.Review;
import lt.codeacademy.moviereview.api.service.MovieService;
import lt.codeacademy.moviereview.api.service.ReviewService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

import static lt.codeacademy.moviereview.api.config.Endpoint.*;

@RestController
@RequestMapping(API_ROOT + REVIEWS)
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;
    private final MovieService movieService;

    @GetMapping(REVIEW_BY_MOVIE)
    public List<Review> getReviewsByMovieId(@PathVariable(UUID) UUID uuid) {
        return reviewService.getReviewsByMovieId(uuid);
    }

    @PostMapping
    public void createReview(@Valid @RequestBody Review review, @RequestParam(name = MOVIE) UUID uuid) {
        review.setMovie(movieService.getMovieById(uuid));
        reviewService.createReview(review);
    }

}
