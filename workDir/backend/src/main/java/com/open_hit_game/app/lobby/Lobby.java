package com.open_hit_game.app.lobby;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Lobby {

    private UUID id;
    private String joinCode;
    private String hostName;
    private List<String> players;
    private LobbyStatus status;
    private LocalDateTime createdAt;

    public Lobby(String hostName, String joinCode) {
        this.id = UUID.randomUUID();
        this.hostName = hostName;
        this.joinCode = joinCode;
        this.players = new ArrayList<>();
        this.players.add(hostName);
        this.status = LobbyStatus.WAITING;
        this.createdAt = LocalDateTime.now();
    }

    public UUID getId() { return id; }
    public String getJoinCode() { return joinCode; }
    public String getHostName() { return hostName; }
    public List<String> getPlayers() { return players; }
    public LobbyStatus getStatus() { return status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}