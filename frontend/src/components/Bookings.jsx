import React from 'react';
import api from '../api';
import './Bookings.css';

function Bookings({ bookings, username, onDelete }) {
  const myBookings = bookings.filter(b => b.username === username);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      await api.delete(`/api/bookings/${id}`);
      if (onDelete) onDelete();
    } catch (err) {
      alert('Failed to cancel booking.');
    }
  };

  return (
    <div className="bookings-container">
      <h2 className="bookings-title">My Bookings 🎟️</h2>
      {myBookings.length === 0 ? (
        <div className="no-bookings">
          <div className="no-bookings-icon">🎬</div>
          <p>You have no bookings yet.</p>
          <p className="no-bookings-sub">Go to Movies and book your first ticket!</p>
        </div>
      ) : (
        <div className="bookings-grid">
          {myBookings.map(b => (
            <div key={b.id} className="booking-card">
              <div className="booking-card-header">
                <span className="booking-movie">🎬 {b.movieTitle}</span>
                <span className="booking-id">#{b.id}</span>
              </div>
              <div className="booking-details">
                <div className="booking-detail">
                  <span className="detail-label">Show Time</span>
                  <span className="detail-value">🕐 {b.showTime}</span>
                </div>
                <div className="booking-detail">
                  <span className="detail-label">Seats</span>
                  <span className="detail-value">🪑 {b.selectedSeats || b.seats}</span>
                </div>
                <div className="booking-detail">
                  <span className="detail-label">Total Paid</span>
                  <span className="detail-value price">₹{b.totalPrice}</span>
                </div>
              </div>
              <button className="cancel-btn" onClick={() => handleCancel(b.id)}>
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookings;
