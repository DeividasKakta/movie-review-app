package lt.codeacademy.moviereview.api.repository;

import lt.codeacademy.moviereview.api.model.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ReviewRepository extends JpaRepository<Review, UUID> {

    List<Review> findAllByMovieId(UUID uuid);
}
