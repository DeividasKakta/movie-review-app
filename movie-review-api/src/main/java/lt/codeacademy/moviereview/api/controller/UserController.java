package lt.codeacademy.moviereview.api.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lt.codeacademy.moviereview.api.model.dto.UserRegistrationDto;
import lt.codeacademy.moviereview.api.model.entity.Role;
import lt.codeacademy.moviereview.api.model.entity.User;
import lt.codeacademy.moviereview.api.service.RoleService;
import lt.codeacademy.moviereview.api.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

import static lt.codeacademy.moviereview.api.config.Endpoint.REGISTER;

@Slf4j
@RestController
@RequestMapping(REGISTER)
@RequiredArgsConstructor
@Api(tags = "User controller")
public class UserController {

    private final UserService userService;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation("Create new user")
    @ApiResponse(code = 201, message = "User created successfully")
    public void register(@RequestBody @Valid UserRegistrationDto userDto) {
        User user = new User();
        Set<Role> roles = new HashSet<>();

        try {
            user.setRoles(roleService.addUserRoleToSet(roles));
            user.setUsername(userDto.getUsername());
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));

            userService.saveNewUser(user);
        } catch (Exception e) {
            log.warn("Could not save new user");
        }
    }
}
