package com.open_hit_game.app.lobby;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LobbyServiceTest {

    private final LobbyService lobbyService = new LobbyService();

    @Test
    void shouldCreateLobbySuccessfully() {
        Lobby lobby = lobbyService.createLobby("Dennis");

        assertNotNull(lobby);
        assertEquals("Dennis", lobby.getHostName());
    }
}