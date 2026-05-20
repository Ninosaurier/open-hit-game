package com.open_hit_game.app.lobby;

import com.open_hit_game.generated.api.LobbyApi;
import com.open_hit_game.generated.model.CreateLobbyRequestV1Dto;
import com.open_hit_game.generated.model.CreateLobbyResponseV1Dto;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LobbyController implements LobbyApi {

    private final LobbyService lobbyService;

    public LobbyController(LobbyService lobbyService) {
        this.lobbyService = lobbyService;
    }

    @Override
    public ResponseEntity<CreateLobbyResponseV1Dto> createLobby(
            CreateLobbyRequestV1Dto request
    ) {

        Lobby lobby = lobbyService.createLobby(
                request.getPlayerName()
        );

        CreateLobbyResponseV1Dto response =
                new CreateLobbyResponseV1Dto();

        response.setJoinCode(lobby.getJoinCode());

        return ResponseEntity.ok(response);
    }
}