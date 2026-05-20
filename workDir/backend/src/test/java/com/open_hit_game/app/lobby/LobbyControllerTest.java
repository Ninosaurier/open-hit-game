package com.open_hit_game.app.lobby;

import com.open_hit_game.generated.model.CreateLobbyRequestV1Dto;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.AutoConfigureJsonTesters;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureJsonTesters
class LobbyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JacksonTester<CreateLobbyRequestV1Dto> jsonTester;

    @MockitoBean
    private LobbyService lobbyService;

    @Test
    void shouldCreateLobby() throws Exception {

        Lobby lobby = new Lobby("TestLobby", "AB12CD");

        when(lobbyService.createLobby("TestLobby"))
                .thenReturn(lobby);

        CreateLobbyRequestV1Dto request =
                new CreateLobbyRequestV1Dto();

        request.setPlayerName("TestLobby");

        mockMvc.perform(post("/api/lobbies")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonTester.write(request).getJson()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.joinCode").value("AB12CD"));
    }
}