package com.open_hit_game.app.lobby;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.http.MediaType;

import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class LobbyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private LobbyService lobbyService;

    @Test
    void shouldCreateLobby() throws Exception {

        Lobby lobby = new Lobby("TestLobby", "AB12CD");

        when(lobbyService.createLobby("TestLobby"))
                .thenReturn(lobby);

        mockMvc.perform(post("/api/lobbies")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "playerName": "TestLobby"
                    }
                    """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.joinCode").value("AB12CD"));
    }

    @Test
    void shouldReturn404WhenLobbyDoesNotExist() throws Exception
    {
        when(lobbyService.getByCode("FAIL123")).thenReturn(null);

        mockMvc.perform(get("/lobby/FAIL123")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldReturn400WhenPlayerNameIsBlank() throws Exception {

        mockMvc.perform(post("/api/lobbies")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "playerName": ""
                    }
                    """))
                .andExpect(status().isBadRequest()); 
    }

    @Test
    void shouldReturn400WhenPlayerNameContainsOnlySpaces() throws Exception {

        mockMvc.perform(post("/api/lobbies")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "playerName": "   "
                    }
                    """))
                .andExpect(status().isBadRequest()); 
    }
}