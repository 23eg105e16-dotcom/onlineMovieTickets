package com.movies.controller;

import com.movies.model.Booking;
import com.movies.repository.BookingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    private final BookingRepository bookingRepository;

    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @GetMapping("/user/{username}")
    public List<Booking> getBookingsByUser(@PathVariable String username) {
        return bookingRepository.findByUsername(username);
    }

    @GetMapping("/seats")
    public List<String> getBookedSeats(@RequestParam String movieTitle, @RequestParam String showTime) {
        return bookingRepository.findAll().stream()
            .filter(b -> movieTitle.equals(b.getMovieTitle()) && showTime.equals(b.getShowTime()))
            .filter(b -> b.getSelectedSeats() != null && !b.getSelectedSeats().isEmpty())
            .flatMap(b -> Arrays.stream(b.getSelectedSeats().split(",")))
            .map(String::trim)
            .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        return ResponseEntity.ok(bookingRepository.save(booking));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
