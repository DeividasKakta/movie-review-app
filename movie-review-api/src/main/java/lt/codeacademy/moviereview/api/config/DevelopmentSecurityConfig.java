package lt.codeacademy.moviereview.api.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lt.codeacademy.moviereview.api.security.JWTAuthenticationFilter;
import lt.codeacademy.moviereview.api.security.JWTAuthorizationFilter;
import lt.codeacademy.moviereview.api.security.JwtService;
import lt.codeacademy.moviereview.api.service.UserService;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@Configuration
@Profile("development")
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class DevelopmentSecurityConfig extends WebSecurityConfigurerAdapter {
    private final ObjectMapper objectMapper;
    private final JwtService jwtService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    .and()
                .authorizeRequests()
                    .antMatchers("/reviews/movie/**", "/movies/**", "/register", "/reviews/newest").permitAll()
                    .anyRequest().authenticated()
                    .and()
                .exceptionHandling()
                    .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
                    .and()
                .addFilter(new JWTAuthenticationFilter(authenticationManager(), objectMapper, jwtService))
                .addFilter(new JWTAuthorizationFilter(authenticationManager(), jwtService));

    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(userService)
                .passwordEncoder(passwordEncoder);
    }

    @Override
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers("/h2/**");
    }
}
