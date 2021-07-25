package lt.codeacademy.moviereview.api.controller;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.moviereview.api.config.Endpoint;
import lt.codeacademy.moviereview.api.model.dto.ActorDto;
import lt.codeacademy.moviereview.api.model.entity.Actor;
import lt.codeacademy.moviereview.api.service.ActorService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

import static lt.codeacademy.moviereview.api.config.Endpoint.BY_UUID;
import static lt.codeacademy.moviereview.api.config.Endpoint.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping(Endpoint.ACTORS)
public class ActorController {
    private final ActorService actorService;

    @GetMapping
    public List<ActorDto> getAllActors() {
        return actorService.getAllActors();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public void createActor(@Valid @RequestBody Actor actor) {
        actorService.createActor(actor);
    }

    @PutMapping(BY_UUID)
    @PreAuthorize("hasRole('ADMIN')")
    public void updateMovie(@PathVariable(UUID) UUID uuid, @Valid @RequestBody Actor actor) {
        actor.setId(uuid);
        actorService.updateActor(actor);
    }
}
