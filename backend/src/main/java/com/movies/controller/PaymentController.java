package com.movies.controller;

import com.movies.model.Booking;
import com.movies.model.Payment;
import com.movies.repository.BookingRepository;
import com.movies.repository.PaymentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;

    public PaymentController(PaymentRepository paymentRepository, BookingRepository bookingRepository) {
        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
    }

    @PostMapping("/process")
    public ResponseEntity<?> processPayment(@RequestBody Map<String, Object> req) {
        try {
            String username      = (String) req.get("username");
            String movieTitle    = (String) req.get("movieTitle");
            String showTime      = (String) req.get("showTime");
            String paymentMethod = (String) req.getOrDefault("paymentMethod", "CARD");
            int    seats         = Integer.parseInt(req.get("seats").toString());
            double amount        = Double.parseDouble(req.get("amount").toString());

            String txnId = "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
            String selectedSeats = (String) req.getOrDefault("selectedSeats", "");

            Payment payment = new Payment();
            payment.setUsername(username);
            payment.setMovieTitle(movieTitle);
            payment.setSeats(seats);
            payment.setAmount(amount);
            payment.setShowTime(showTime);
            payment.setPaymentMethod(paymentMethod);
            payment.setTransactionId(txnId);

            if ("UPI".equals(paymentMethod)) {
                String upiId = (String) req.get("upiId");
                if (upiId == null || !upiId.contains("@")) {
                    return ResponseEntity.badRequest().body(Map.of("status", "FAILED", "message", "Invalid UPI ID. Format: name@bank"));
                }
                payment.setUpiId(upiId);
                payment.setStatus("SUCCESS");
            } else {
                String cardNumber = (String) req.get("cardNumber");
                String cardHolder = (String) req.get("cardHolder");
                if (cardNumber != null && cardNumber.startsWith("0000")) {
                    return ResponseEntity.badRequest().body(Map.of("status", "FAILED", "message", "Card declined. Please use a valid card."));
                }
                String last4 = cardNumber != null && cardNumber.length() >= 4
                        ? cardNumber.substring(cardNumber.length() - 4) : "****";
                payment.setCardHolder(cardHolder);
                payment.setCardLast4(last4);
                payment.setStatus("SUCCESS");
            }

            paymentRepository.save(payment);
            bookingRepository.save(new Booking(username, movieTitle, seats, amount, showTime, selectedSeats));

            return ResponseEntity.ok(Map.of(
                "status", "SUCCESS",
                "transactionId", txnId,
                "message", "Payment successful! Your tickets are confirmed.",
                "paymentMethod", paymentMethod
            ));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("status", "FAILED", "message", "Payment processing error: " + e.getMessage()));
        }
    }

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @GetMapping("/user/{username}")
    public List<Payment> getByUser(@PathVariable String username) {
        return paymentRepository.findByUsername(username);
    }
}
