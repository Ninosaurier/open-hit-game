package com.open_hit_game.app.song;

public class Song {

    private String title;
    private String game;
    private int year;
    private String youtubeId;
    private String platform;
    private boolean played;

    public Song(
        String title,
        String game,
        int year,
        String youtubeId,
        String platform,
        boolean played
    ) {
        this.title = title;
        this.game = game;
        this.year = year;
        this.youtubeId = youtubeId;
        this.platform = platform;
        this.played = played;
    }

    public String getTitle() { return title; }
    public String getGame() { return game; }
    public int getYear() { return year; }
    public String getYoutubeId() { return youtubeId; }
    public String getPlatform() { return platform; }
    public boolean isPlayed() { return played; }
}