package com.movie.controller;

import com.movie.model.Booking;
import com.movie.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin
public class BookingController {

    private final BookingService service;

    public BookingController(BookingService service) {
        this.service = service;
    }

    @GetMapping("/bookings")
    public List<Booking> getBookings() {
        return service.getBookings();
    }

    @PostMapping("/book")
    public Booking book(@RequestBody Map<String, Object> data) {

        String id = (String) data.get("showtimeId");
        int seats = Integer.parseInt(data.get("seatCount").toString());

        return service.addBooking(id, seats);
    }
}