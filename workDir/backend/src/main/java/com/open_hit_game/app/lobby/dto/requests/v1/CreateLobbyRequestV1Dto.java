package com.open_hit_game.app.lobby.dto.requests.v1;
import jakarta.validation.constraints.NotBlank;

public class CreateLobbyRequestV1Dto {

    @NotBlank(message = "Should not be blank")
    private String playerName;

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }
}