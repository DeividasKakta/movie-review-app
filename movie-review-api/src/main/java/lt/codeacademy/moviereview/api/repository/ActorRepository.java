package lt.codeacademy.moviereview.api.repository;

import lt.codeacademy.moviereview.api.model.entity.Actor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ActorRepository extends JpaRepository<Actor, UUID> {
}
