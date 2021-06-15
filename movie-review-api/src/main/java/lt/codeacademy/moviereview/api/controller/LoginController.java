package lt.codeacademy.moviereview.api.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
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
@Api(tags = "Login controller")
public class LoginController {
    private final LoggedInUserDtoMapper userDtoMapper;

    @PostMapping()
    @ApiOperation("Login and get logged in user")
    @ApiResponse(code = 200, message = "Logged in successfully")
    public LoggedInUserDto getLoggedInUserDto(@AuthenticationPrincipal User user) {
        return userDtoMapper.mapToDto(user);
    }
}