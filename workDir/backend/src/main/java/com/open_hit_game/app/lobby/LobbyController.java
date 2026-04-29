package com.open_hit_game.app.lobby;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lobbies")
public class LobbyController {

    private final LobbyService lobbyService;

    public LobbyController(LobbyService lobbyService) {
        this.lobbyService = lobbyService;
    }

    @PostMapping
    public Lobby create(@RequestBody CreateLobbyRequest request) {
        return lobbyService.createLobby(request.getPlayerName());
    }

    @GetMapping("/{code}")
    public Lobby getLobby(@PathVariable String code) {
        return lobbyService.getByCode(code);
    }
}