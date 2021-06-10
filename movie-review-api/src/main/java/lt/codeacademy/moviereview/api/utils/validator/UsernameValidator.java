package lt.codeacademy.moviereview.api.utils.validator;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.moviereview.api.repository.UserRepository;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@RequiredArgsConstructor
public class UsernameValidator implements ConstraintValidator<Username, String> {

    private final UserRepository userRepository;

    @Override
    public boolean isValid(String username, ConstraintValidatorContext context) {
        return userRepository.findUserByUsername(username) == null;
    }
}
