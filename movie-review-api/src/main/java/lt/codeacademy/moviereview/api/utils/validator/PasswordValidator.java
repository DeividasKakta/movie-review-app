package lt.codeacademy.moviereview.api.utils.validator;

import lombok.extern.slf4j.Slf4j;
import lt.codeacademy.moviereview.api.model.dto.UserRegistrationDto;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@Slf4j
public class PasswordValidator implements ConstraintValidator<Password, UserRegistrationDto> {

    @Override
    public boolean isValid(UserRegistrationDto userRegistrationDto, ConstraintValidatorContext context) {
        try {
            return userRegistrationDto.getPassword().equals(userRegistrationDto.getRepeatPassword());
        } catch (Exception e) {
            log.warn("Invalid password: " + e.getMessage());
        }
        return false;
    }
}
