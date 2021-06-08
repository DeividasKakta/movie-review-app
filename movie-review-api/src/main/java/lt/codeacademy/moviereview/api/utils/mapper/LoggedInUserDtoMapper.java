package lt.codeacademy.moviereview.api.utils.mapper;

import lt.codeacademy.moviereview.api.model.dto.LoggedInUserDto;
import lt.codeacademy.moviereview.api.model.entity.Role;
import lt.codeacademy.moviereview.api.model.entity.User;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class LoggedInUserDtoMapper {

    public LoggedInUserDto mapToDto(User user) {
        return LoggedInUserDto.builder()
                .username(user.getUsername())
                .roles(user.getRoles().stream()
                        .map(Role::getName)
                        .collect(Collectors.toSet())
                )
                .build();
    }
}