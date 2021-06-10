package lt.codeacademy.moviereview.api.service;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.moviereview.api.model.entity.Role;
import lt.codeacademy.moviereview.api.repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    public Set<Role> addUserRoleToSet(Set<Role> roles) {
        roles.add(roleRepository.getUserRole());

        return roles;
    }
}
