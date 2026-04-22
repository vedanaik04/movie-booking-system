package com.movie.controller;

import com.movie.model.Showtime;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin
public class ShowtimeController {

    @GetMapping("/showtimes")
    public List<Showtime> getShowtimes() {

        List<Showtime> list = new ArrayList<>();

        list.add(new Showtime("S1", "Inception", "6:00 PM", 50));
        list.add(new Showtime("S2", "The Dark Knight", "7:30 PM", 40));

        return list;
    }
}