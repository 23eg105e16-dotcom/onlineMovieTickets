package com.movies.model;

import jakarta.persistence.*;

@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String movieTitle;
    private int seats;
    private double amount;
    private String showTime;
    private String paymentMethod; // CARD or UPI
    private String cardHolder;
    private String cardLast4;
    private String upiId;
    private String status;
    private String transactionId;

    public Payment() {}

    public Long getId() { return id; }
    public String getUsername() { return username; }
    public void setUsername(String u) { this.username = u; }
    public String getMovieTitle() { return movieTitle; }
    public void setMovieTitle(String m) { this.movieTitle = m; }
    public int getSeats() { return seats; }
    public void setSeats(int s) { this.seats = s; }
    public double getAmount() { return amount; }
    public void setAmount(double a) { this.amount = a; }
    public String getShowTime() { return showTime; }
    public void setShowTime(String s) { this.showTime = s; }
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String p) { this.paymentMethod = p; }
    public String getCardHolder() { return cardHolder; }
    public void setCardHolder(String c) { this.cardHolder = c; }
    public String getCardLast4() { return cardLast4; }
    public void setCardLast4(String c) { this.cardLast4 = c; }
    public String getUpiId() { return upiId; }
    public void setUpiId(String u) { this.upiId = u; }
    public String getStatus() { return status; }
    public void setStatus(String s) { this.status = s; }
    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String t) { this.transactionId = t; }
}
