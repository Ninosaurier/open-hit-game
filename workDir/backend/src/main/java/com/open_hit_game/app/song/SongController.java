package com.open_hit_game.app.song;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/songs")
public class SongController {

    @GetMapping("/random")
    public Song getRandomSong() {
        return new Song(
            "Gerudo Valley",
            "Zelda: Ocarina of Time",
            1998,
            "abc123xyz",
            "N64",
            false
        );
    }
}