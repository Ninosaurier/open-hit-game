package com.open_hit_game.app.lobby;

import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;
import java.util.Random;

@Service
public class LobbyService {

    private final int LOBBY_CODE_LENGTH = 6;
    private final Map<String, Lobby> lobbies = new ConcurrentHashMap<>();


    public Lobby createLobby(String hostName) {
        String code = generateCode();
        Lobby lobby = new Lobby(hostName, code);
        lobbies.put(code, lobby);
        return lobby;
    }

    public Lobby getByCode(String code) {
        return lobbies.get(code);
    }

    private String generateCode() {
        String chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        Random random = new Random();

        String code;
        do {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < LOBBY_CODE_LENGTH; i++) {
                sb.append(chars.charAt(random.nextInt(chars.length())));
            }
            code = sb.toString();
        } while (lobbies.containsKey(code));

        return code;
    }
}