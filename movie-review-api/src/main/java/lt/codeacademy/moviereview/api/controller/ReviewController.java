package lt.codeacademy.moviereview.api.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lt.codeacademy.moviereview.api.exception.ForbiddenException;
import lt.codeacademy.moviereview.api.model.dto.ReviewDto;
import lt.codeacademy.moviereview.api.model.entity.Review;
import lt.codeacademy.moviereview.api.model.entity.User;
import lt.codeacademy.moviereview.api.service.MovieService;
import lt.codeacademy.moviereview.api.service.ReviewService;
import lt.codeacademy.moviereview.api.service.RoleService;
import lt.codeacademy.moviereview.api.service.UserService;
import lt.codeacademy.moviereview.api.utils.mapper.ReviewDtoMapper;
import org.springframework.http.HttpStatus;
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
@Api(tags = "Review controller")
public class ReviewController {
    private final ReviewService reviewService;
    private final MovieService movieService;
    private final ReviewDtoMapper reviewDtoMapper;
    private final UserService userService;
    private final RoleService roleService;

    @GetMapping(REVIEW_BY_MOVIE)
    @ApiOperation("Get all reviews by movie id")
    @ApiResponse(code = 200, message = "Reviews loaded successfully")
    public List<ReviewDto> getReviewsByMovieId(@PathVariable(UUID) UUID uuid) {
        List<Review> reviewsByMovieId = reviewService.getReviewsByMovieId(uuid);

        return reviewsByMovieId.stream()
                .map(reviewDtoMapper::mapToDto)
                .sorted(Comparator.comparing(ReviewDto::getReviewDate).reversed())
                .collect(Collectors.toList());
    }

    @GetMapping(NEWEST)
    @ApiOperation("Get all top reviews")
    @ApiResponse(code = 200, message = "Reviews loaded successfully")
    public List<ReviewDto> getNewestReviews() {
        List<Review> allReviews = reviewService.getAllReviews();

        return allReviews.stream()
                .map(reviewDtoMapper::mapToDto)
                .sorted(Comparator.comparing(ReviewDto::getReviewDate).reversed())
                .collect(Collectors.toList());
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation("Create a review")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Review created successfully"),
            @ApiResponse(code = 401, message = "Login to create a review"),
            @ApiResponse(code = 403, message = "Need required permissions to create a review")
    })
    public void createReview(@Valid @RequestBody Review review,
                             @RequestParam(name = MOVIE) UUID uuid,
                             @AuthenticationPrincipal String username) {
        User user = userService.loadUserByUsername(username);

        review.setUser(user);
        review.setMovie(movieService.getMovieById(uuid));

        reviewService.createReview(review);
    }

    @PutMapping(BY_UUID)
    @ApiOperation("Update a review")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Review updated successfully"),
            @ApiResponse(code = 401, message = "Login to update a review"),
            @ApiResponse(code = 403, message = "Need required permissions to update a review")
    })
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
            throw new ForbiddenException();
        }

    }

    @DeleteMapping(BY_UUID)
    @ApiOperation("Delete a review")
    @ApiResponses(value = {
            @ApiResponse(code = 204, message = "Review deleted successfully"),
            @ApiResponse(code = 401, message = "Login to delete a review"),
            @ApiResponse(code = 403, message = "Need required permissions to delete a review")
    })
    public void deleteReview(@PathVariable(UUID) UUID uuid,
                             @AuthenticationPrincipal String username) {
        User user = userService.loadUserByUsername(username);
        Review review = reviewService.getReviewById(uuid);

        if (review.getUser().getUsername().equals(username) || user.getRoles().contains(roleService.getRoleByName("ADMIN"))) {
            reviewService.deleteReviewById(uuid);
        } else {
            throw new ForbiddenException();
        }

    }
}
