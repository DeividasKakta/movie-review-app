package lt.codeacademy.moviereview.api.controller;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.moviereview.api.model.dto.LoggedInUserDto;
import lt.codeacademy.moviereview.api.model.entity.User;
import lt.codeacademy.moviereview.api.utils.mapper.LoggedInUserDtoMapper;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static lt.codeacademy.moviereview.api.config.Endpoint.LOGIN;

@RestController
@RequiredArgsConstructor
@RequestMapping(LOGIN)
public class LoginController {
    private final LoggedInUserDtoMapper userDtoMapper;

    @PostMapping()
    public LoggedInUserDto getLoggedInUserDto(@AuthenticationPrincipal User user) {
        return userDtoMapper.mapToDto(user);
    }
}