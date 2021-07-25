package lt.codeacademy.moviereview.api.utils.mapper;

import lt.codeacademy.moviereview.api.model.dto.ActorDto;
import lt.codeacademy.moviereview.api.model.entity.Actor;
import org.springframework.stereotype.Component;

@Component
public class ActorDtoMapper {

    public ActorDto mapToDto(Actor actor) {
        return ActorDto.builder()
                .name(actor.getName())
                .surname(actor.getSurname())
                .birthDate(actor.getBirthDate())
                .build();
    }
}
