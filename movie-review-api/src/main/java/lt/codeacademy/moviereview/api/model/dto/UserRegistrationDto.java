package lt.codeacademy.moviereview.api.model.dto;

import lombok.Getter;
import lombok.Setter;
import lt.codeacademy.moviereview.api.utils.validator.Password;
import lt.codeacademy.moviereview.api.utils.validator.Username;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Setter
@Getter
@Password
public class UserRegistrationDto {
    @Size(min = 4, max = 16, message = "Username must be 4-16 symbols long")
    @Username
    private String username;

    @NotBlank
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$", message = "Password must contain at least 1 letter and number, must be 8-32 symbols long")
    @Size(min = 8, max = 32, message = "Password must be 8-32 symbols long")
    private String password;

    @NotBlank
    private String repeatPassword;

}
