package lt.codeacademy.moviereview.api.service;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.moviereview.api.model.entity.User;
import lt.codeacademy.moviereview.api.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsernameWithRoles(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found."));
    }
}
