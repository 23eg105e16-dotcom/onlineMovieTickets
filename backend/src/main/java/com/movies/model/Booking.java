package com.movies.model;

import jakarta.persistence.*;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String movieTitle;
    private int seats;
    private double totalPrice;
    private String showTime;
    private String selectedSeats;

    public Booking() {}

    public Booking(String username, String movieTitle, int seats, double totalPrice, String showTime, String selectedSeats) {
        this.username = username;
        this.movieTitle = movieTitle;
        this.seats = seats;
        this.totalPrice = totalPrice;
        this.showTime = showTime;
        this.selectedSeats = selectedSeats;
    }

    public Long getId() { return id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getMovieTitle() { return movieTitle; }
    public void setMovieTitle(String movieTitle) { this.movieTitle = movieTitle; }
    public int getSeats() { return seats; }
    public void setSeats(int seats) { this.seats = seats; }
    public double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }
    public String getShowTime() { return showTime; }
    public void setShowTime(String showTime) { this.showTime = showTime; }
    public String getSelectedSeats() { return selectedSeats; }
    public void setSelectedSeats(String selectedSeats) { this.selectedSeats = selectedSeats; }
}
