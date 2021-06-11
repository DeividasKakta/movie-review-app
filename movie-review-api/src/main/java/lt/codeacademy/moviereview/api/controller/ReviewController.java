package lt.codeacademy.moviereview.api.controller;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.moviereview.api.model.dto.ReviewDto;
import lt.codeacademy.moviereview.api.model.entity.Review;
import lt.codeacademy.moviereview.api.model.entity.User;
import lt.codeacademy.moviereview.api.service.MovieService;
import lt.codeacademy.moviereview.api.service.ReviewService;
import lt.codeacademy.moviereview.api.service.UserService;
import lt.codeacademy.moviereview.api.utils.mapper.ReviewDtoMapper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static lt.codeacademy.moviereview.api.config.Endpoint.*;

@RestController
@RequestMapping(REVIEWS)
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;
    private final MovieService movieService;
    private final ReviewDtoMapper reviewDtoMapper;
    private final UserService userService;

    @GetMapping(REVIEW_BY_MOVIE)
    public List<ReviewDto> getReviewsByMovieId(@PathVariable(UUID) UUID uuid) {
        List<Review> reviewsByMovieId = reviewService.getReviewsByMovieId(uuid);

        return reviewsByMovieId.stream()
                .map(reviewDtoMapper::mapToDto)
                .sorted(Comparator.comparing(ReviewDto::getReviewDate).reversed())
                .collect(Collectors.toList());
    }

    @GetMapping(NEWEST)
    public List<ReviewDto> getNewestReviews() {
        List<Review> allReviews = reviewService.getAllReviews();

        return allReviews.stream()
                .map(reviewDtoMapper::mapToDto)
                .sorted(Comparator.comparing(ReviewDto::getReviewDate).reversed())
                .collect(Collectors.toList());
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public void createReview(@Valid @RequestBody Review review,
                             @RequestParam(name = MOVIE) UUID uuid,
                             @AuthenticationPrincipal String username) {
//        String principal = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userService.loadUserByUsername(username);

        review.setUser(user);
        review.setMovie(movieService.getMovieById(uuid));

        reviewService.createReview(review);
    }

    @PutMapping(BY_UUID)
    public void updateReview(@Valid @RequestBody Review review,
                             @PathVariable(UUID) UUID uuid,
                             @AuthenticationPrincipal String username) {
        Review oldReview = reviewService.getReviewById(uuid);

        oldReview.setContent(review.getContent());
        oldReview.setRating(review.getRating());

//        User user = userService.loadUserByUsername(username);
//
//        review.setUser(user);

        reviewService.updateReview(oldReview);
    }

    @DeleteMapping(BY_UUID)
    @PreAuthorize("#reviewUsername eq #username or hasRole('ADMIN')")
    public void deleteReview(@PathVariable(UUID) UUID uuid,
                             @RequestParam(name = "user") String reviewUsername,
                             @AuthenticationPrincipal String username) {

        reviewService.deleteReviewById(uuid);
    }
}
