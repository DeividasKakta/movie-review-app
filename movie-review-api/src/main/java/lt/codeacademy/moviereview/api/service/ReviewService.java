package lt.codeacademy.moviereview.api.service;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.moviereview.api.model.entity.Review;
import lt.codeacademy.moviereview.api.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;

    public List<Review> getReviewsByMovieId(UUID uuid) {
        return reviewRepository.findAllByMovieId(uuid);
    }

    public void createReview(Review review) {
        reviewRepository.save(review);
    }
}
