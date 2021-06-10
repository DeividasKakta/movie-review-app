package lt.codeacademy.moviereview.api.repository;

import lt.codeacademy.moviereview.api.model.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, UUID> {

    @Query("SELECT r FROM Role r WHERE r.name = 'USER'")
    Role getUserRole();

}
