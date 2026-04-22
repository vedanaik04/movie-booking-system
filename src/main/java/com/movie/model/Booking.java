package com.movie.model;

public class Booking {

    private String id;
    private String movie;
    private int seats;

    public Booking() {}

    public Booking(String id, String movie, int seats) {
        this.id = id;
        this.movie = movie;
        this.seats = seats;
    }

    public String getId() { return id; }
    public String getMovie() { return movie; }
    public int getSeats() { return seats; }
}