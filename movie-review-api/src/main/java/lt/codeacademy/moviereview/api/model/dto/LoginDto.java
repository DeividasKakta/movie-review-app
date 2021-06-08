package lt.codeacademy.moviereview.api.model.dto;

import lombok.Data;

@Data
public class LoginDto {
    private String username;
    private String password;
}
