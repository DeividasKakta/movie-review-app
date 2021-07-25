package lt.codeacademy.moviereview.api.controller;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.moviereview.api.config.Endpoint;
import lt.codeacademy.moviereview.api.model.dto.ActorDto;
import lt.codeacademy.moviereview.api.service.ActorService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(Endpoint.ACTORS)
public class ActorController {
    private final ActorService actorService;

    @GetMapping
    public List<ActorDto> getAllActors() {
        return actorService.getAllActors();
    }
}
