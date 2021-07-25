package lt.codeacademy.moviereview.api.service;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.moviereview.api.model.dto.ActorDto;
import lt.codeacademy.moviereview.api.model.entity.Actor;
import lt.codeacademy.moviereview.api.repository.ActorRepository;
import lt.codeacademy.moviereview.api.utils.mapper.ActorDtoMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActorService {
    private final ActorRepository actorRepository;
    private final ActorDtoMapper actorDtoMapper;

    public List<ActorDto> getAllActors() {
        List<Actor> allActors = actorRepository.findAll();

        if (allActors.isEmpty()) {
            return new ArrayList<>();
        } else {
            return allActors.stream()
                    .map(actorDtoMapper::mapToDto)
                    .sorted(Comparator.comparing(ActorDto::getSurname))
                    .collect(Collectors.toList());
        }
    }

    public void createActor(Actor actor) {
        actorRepository.save(actor);
    }
}
