package com.open_hit_game.app.controller;
import org.springframework.web.bind.annotation.*;
import com.open_hit_game.app.model.Song;

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