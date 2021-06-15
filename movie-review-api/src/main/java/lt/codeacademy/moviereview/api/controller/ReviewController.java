package lt.codeacademy.moviereview.api.controller;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.moviereview.api.exception.UnauthorizedException;
import lt.codeacademy.moviereview.api.model.dto.ReviewDto;
import lt.codeacademy.moviereview.api.model.entity.Review;
import lt.codeacademy.moviereview.api.model.entity.User;
import lt.codeacademy.moviereview.api.service.MovieService;
import lt.codeacademy.moviereview.api.service.ReviewService;
import lt.codeacademy.moviereview.api.service.RoleService;
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
    private final RoleService roleService;

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
        User user = userService.loadUserByUsername(username);

        review.setUser(user);
        review.setMovie(movieService.getMovieById(uuid));

        reviewService.createReview(review);
    }

    @PutMapping(BY_UUID)
    public void updateReview(@Valid @RequestBody Review review,
                             @PathVariable(UUID) UUID uuid,
                             @AuthenticationPrincipal String username) {
        Review originalReview = reviewService.getReviewById(uuid);

        if (originalReview.getUser().getUsername().equals(username)) {
            originalReview.setContent(review.getContent());
            originalReview.setRating(review.getRating());
            originalReview.setTitle(review.getTitle());

            reviewService.updateReview(originalReview);
        } else {
            throw new UnauthorizedException();
        }

    }

    @DeleteMapping(BY_UUID)
    public void deleteReview(@PathVariable(UUID) UUID uuid,
                             @AuthenticationPrincipal String username) {
        User user = userService.loadUserByUsername(username);
        Review review = reviewService.getReviewById(uuid);

        if (review.getUser().getUsername().equals(username) || user.getRoles().contains(roleService.getRoleByName("ADMIN"))) {
            reviewService.deleteReviewById(uuid);
        } else {
            throw new UnauthorizedException();
        }

    }
}
