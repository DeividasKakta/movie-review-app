package lt.codeacademy.moviereview.api.service;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.moviereview.api.repository.ReviewRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
}
