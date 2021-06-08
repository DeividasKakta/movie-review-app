package lt.codeacademy.moviereview.api.model.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.Set;

@Builder
@Getter
public class LoggedInUserDto {
    private final String username;
    private final Set<String> roles;

}