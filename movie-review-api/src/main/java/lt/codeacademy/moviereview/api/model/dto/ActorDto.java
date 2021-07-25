package lt.codeacademy.moviereview.api.model.dto;

import lombok.Builder;
import lombok.Getter;

import java.sql.Date;

@Builder
@Getter
public class ActorDto {
    private final String name;
    private final String surname;
    private final Date birthDate;

}
