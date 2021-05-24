package lt.codeacademy.moviereview.api.repository;

import lt.codeacademy.moviereview.api.model.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MovieRepository extends JpaRepository<Movie, UUID> {
}
