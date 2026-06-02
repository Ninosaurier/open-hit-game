package com.open_hit_game.app.lobby;

import com.open_hit_game.app.lobby.dto.requests.v1.CreateLobbyRequestV1Dto;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;


@RestController
@RequestMapping("/api/lobbies")
@Validated
public class LobbyController {

    private final LobbyService lobbyService;

    public LobbyController(LobbyService lobbyService) {
        this.lobbyService = lobbyService;
    }

    @PostMapping
    public Lobby create(@Valid @RequestBody CreateLobbyRequestV1Dto request) {
        return lobbyService.createLobby(request.getPlayerName());
    }

    @GetMapping("/{code}")
    public Lobby getLobby(@PathVariable String code) {

        Lobby lobby = lobbyService.getByCode(code);
        
        if (lobby == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Lobby not found.");
        }
        
        return lobby;
    }
}