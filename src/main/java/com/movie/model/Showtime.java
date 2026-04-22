package com.movie.model;

public class Showtime {

    private String id;
    private String movie;
    private String time;
    private int seats;

    public Showtime() {}

    public Showtime(String id, String movie, String time, int seats) {
        this.id = id;
        this.movie = movie;
        this.time = time;
        this.seats = seats;
    }

    public String getId() { return id; }
    public String getMovie() { return movie; }
    public String getTime() { return time; }
    public int getSeats() { return seats; }
}