package com.movie.service;

import com.movie.model.Booking;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BookingService {

    private List<Booking> bookings = new ArrayList<>();

    public List<Booking> getBookings() {
        return bookings;
    }

    public Booking addBooking(String showtimeId, int seats) {

        String movie = "";

        if (showtimeId.equals("S1")) movie = "Inception";
        else if (showtimeId.equals("S2")) movie = "The Dark Knight";

        Booking b = new Booking("B" + (bookings.size() + 1), movie, seats);
        bookings.add(b);

        return b;
    }
}