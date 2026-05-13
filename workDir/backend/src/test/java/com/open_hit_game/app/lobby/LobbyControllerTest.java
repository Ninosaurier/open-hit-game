package com.open_hit_game.app.lobby;

import com.open_hit_game.app.lobby.dto.requests.v1.CreateLobbyRequestV1Dto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.AutoConfigureJsonTesters;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.boot.test.json.JacksonTester; // Modernes Spring-Test-Tool
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(LobbyController.class)
@AutoConfigureJsonTesters // Aktiviert die automatische Bereitstellung von JacksonTester
class LobbyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JacksonTester<CreateLobbyRequestV1Dto> jsonTester; // Modern: Typisierte JSON-Generierung

    @MockitoBean
    private LobbyService lobbyService;

    @Test
    void shouldCreateLobby() throws Exception {

        Lobby lobby = new Lobby("TestLobby", "AB12CD");

        when(lobbyService.createLobby("TestLobby"))
                .thenReturn(lobby);

        CreateLobbyRequestV1Dto request = new CreateLobbyRequestV1Dto();
        request.setPlayerName("TestLobby");

        mockMvc.perform(post("/api/lobbies")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonTester.write(request).getJson())) 
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.hostName").value("TestLobby"))
                .andExpect(jsonPath("$.joinCode").value("AB12CD"));
    }
}
