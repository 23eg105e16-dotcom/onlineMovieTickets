import React, { useState } from 'react';
import api from '../api';
import SeatSelector from './SeatSelector';
import './Movies.css';

const SHOW_TIMES = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'];
const TICKET_PRICE = 150;
const defaultPoster = 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=500';

function Movies({ movies, username, onBookingDone }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats]     = useState([]);
  const [showTime, setShowTime]   = useState(SHOW_TIMES[0]);
  const [step, setStep]           = useState(1);
  const [payMethod, setPayMethod] = useState('UPI'); // UPI | CARD
  const [upiId, setUpiId]         = useState('');
  const [card, setCard]           = useState({ cardHolder: '', cardNumber: '', expiry: '', cvv: '' });
  const [msg, setMsg]             = useState('');
  const [msgType, setMsgType]     = useState('');
  const [loading, setLoading]     = useState(false);
  const [txnId, setTxnId]         = useState('');

  const fetchBookedSeats = async (movie, time) => {
    try {
      const res = await api.get('/api/bookings/seats', {
        params: { movieTitle: movie.title, showTime: time }
      });
      setBookedSeats(res.data);
    } catch { setBookedSeats([]); }
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setSelectedSeats([]); setShowTime(SHOW_TIMES[0]);
    setStep(1); setPayMethod('UPI');
    setUpiId(''); setCard({ cardHolder: '', cardNumber: '', expiry: '', cvv: '' });
    setMsg('');
    fetchBookedSeats(movie, SHOW_TIMES[0]);
  };

  const closeModal = () => setSelectedMovie(null);

  const handleCardChange = (e) => {
    let { name, value } = e.target;
    if (name === 'cardNumber') value = value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    if (name === 'expiry')     value = value.replace(/\D/g, '').slice(0, 4).replace(/^(\d{2})(\d)/, '$1/$2');
    if (name === 'cvv')        value = value.replace(/\D/g, '').slice(0, 3);
    setCard(c => ({ ...c, [name]: value }));
  };

  const handlePay = async () => {
    setMsg(''); setLoading(true);
    try {
      const seats = selectedSeats.length;
      const payload = {
        username: username || 'Guest',
        movieTitle: selectedMovie.title,
        showTime, seats,
        selectedSeats: selectedSeats.join(','),
        amount: seats * TICKET_PRICE,
        paymentMethod: payMethod,
      };

      if (payMethod === 'UPI') {
        const trimmed = upiId.trim();
        if (!trimmed.includes('@') || trimmed.startsWith('@') || trimmed.endsWith('@')) {
          setMsg('Enter a valid UPI ID (e.g. name@gpay or 9876543210@okaxis)');
          setMsgType('error'); setLoading(false); return;
        }
        payload.upiId = trimmed;
      } else {
        if (!card.cardHolder || card.cardNumber.replace(/\s/g,'').length < 16 || card.expiry.length < 5 || card.cvv.length < 3) {
          setMsg('Please fill all card details correctly.'); setMsgType('error'); setLoading(false); return;
        }
        payload.cardHolder  = card.cardHolder;
        payload.cardNumber  = card.cardNumber.replace(/\s/g, '');
      }

      const res = await api.post('/api/payments/process', payload);
      if (res.data.status === 'SUCCESS') {
        setTxnId(res.data.transactionId);
        setStep(3);
        if (onBookingDone) onBookingDone();
      } else {
        setMsg(res.data.message || 'Payment failed.'); setMsgType('error');
      }
    } catch (err) {
      setMsg(err.response?.data?.message || 'Payment failed. Try again.'); setMsgType('error');
    } finally { setLoading(false); }
  };

  return (
    <div className="netflix-container">
      <h2 className="netflix-title">Trending Now 🔥</h2>
      <div className="netflix-grid">
        {movies.map((movie, index) => (
          <div className="netflix-card" key={movie.id || index}>
            <div className="netflix-card-image">
              <img src={movie.posterUrl || defaultPoster} alt={movie.title}
                onError={(e) => { e.target.src = defaultPoster; }} />
              <div className="netflix-card-overlay">
                <div className="netflix-card-content">
                  <h3 className="movie-title">{movie.title}</h3>
                  <div className="movie-meta">
                    {movie.genre  && <span className="movie-genre">{movie.genre}</span>}
                    {movie.rating && <span className="movie-rating">⭐ {movie.rating}</span>}
                  </div>
                  <button className="play-btn" onClick={() => openModal(movie)}>🎟️ Book</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {movies.length === 0 && <div className="no-movies"><p>No movies available.</p></div>}
      </div>

      {selectedMovie && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>

            {/* Steps */}
            <div className="steps-bar">
              <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Select</div>
              <div className="step-line" />
              <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Payment</div>
              <div className="step-line" />
              <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Confirm</div>
            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <div className="modal-header">
                  <img src={selectedMovie.posterUrl || defaultPoster} alt={selectedMovie.title}
                    className="modal-poster" onError={e => { e.target.src = defaultPoster; }} />
                  <div className="modal-info">
                    <h2>{selectedMovie.title}</h2>
                    <p className="modal-genre">{selectedMovie.genre} • {selectedMovie.year}</p>
                    <p className="modal-rating">⭐ {selectedMovie.rating}/10</p>
                    <p className="modal-desc">{selectedMovie.description}</p>
                  </div>
                </div>
                <div className="modal-form">
                  <div className="modal-field">
                    <label>Show Time</label>
                    <select value={showTime} onChange={e => { setShowTime(e.target.value); setSelectedSeats([]); fetchBookedSeats(selectedMovie, e.target.value); }}>
                      {SHOW_TIMES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="modal-field">
                    <label>Select Your Seats</label>
                    <SeatSelector selected={selectedSeats} onChange={setSelectedSeats} bookedSeats={bookedSeats} />
                  </div>
                  <div className="modal-total">
                    Total: <strong>₹{selectedSeats.length * TICKET_PRICE}</strong>
                    <span className="price-note">(₹{TICKET_PRICE}/ticket)</span>
                  </div>
                </div>
                <button className="book-confirm-btn" onClick={() => setStep(2)} disabled={selectedSeats.length === 0}>
                  Proceed to Payment →
                </button>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <div className="payment-summary">
                  <span>🎬 {selectedMovie.title}</span>
                  <span>🕐 {showTime}</span>
                  <span>🪑 {selectedSeats.join(', ')} ({selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''})</span>
                  <span className="pay-amount">₹{selectedSeats.length * TICKET_PRICE}</span>
                </div>

                {/* Payment method tabs */}
                <div className="pay-tabs">
                  <button className={`pay-tab ${payMethod === 'UPI' ? 'active' : ''}`}
                    onClick={() => { setPayMethod('UPI'); setMsg(''); }}>
                    📱 UPI
                  </button>
                  <button className={`pay-tab ${payMethod === 'CARD' ? 'active' : ''}`}
                    onClick={() => { setPayMethod('CARD'); setMsg(''); }}>
                    💳 Card
                  </button>
                </div>

                {/* UPI Form */}
                {payMethod === 'UPI' && (
                  <div className="upi-section">
                    <div className="upi-apps">
                      {[
                        { name: 'GPay',    bg: '#1a7a3c', letter: 'G', color: '#34d399' },
                        { name: 'PhonePe', bg: '#3b1a6e', letter: 'P', color: '#a78bfa' },
                        { name: 'Paytm',   bg: '#003f7f', letter: 'P', color: '#60a5fa' },
                        { name: 'BHIM',    bg: '#7a2e00', letter: 'B', color: '#fb923c' },
                      ].map(app => (
                        <button key={app.name} className="upi-app-btn"
                          onClick={() => {
                            const base = upiId.includes('@') ? upiId.split('@')[0] : upiId;
                            setMsg('');
                            setUpiId(`${base.trim() || 'yourname'}@${app.name.toLowerCase()}`);
                          }}>
                          <span className="upi-app-circle" style={{ background: app.bg, color: app.color }}>{app.letter}</span>
                          <span>{app.name}</span>
                        </button>
                      ))}
                    </div>
                    <div className="modal-field" style={{ marginTop: '16px' }}>
                      <label>Enter UPI ID</label>
                      <input
                        placeholder="e.g. yourname@gpay or 9876543210@okaxis"
                        value={upiId}
                        onChange={e => { setUpiId(e.target.value); setMsg(''); }}
                      />
                    </div>
                    <div className="upi-hint">
                      Examples: <span>name@gpay</span> · <span>9876543210@okaxis</span> · <span>name@paytm</span>
                    </div>
                  </div>
                )}

                {/* Card Form */}
                {payMethod === 'CARD' && (
                  <>
                    <div className="card-visual">
                      <div className="card-chip">💳</div>
                      <div className="card-number-display">
                        {card.cardNumber || '•••• •••• •••• ••••'}
                      </div>
                      <div className="card-bottom">
                        <span>{card.cardHolder || 'CARD HOLDER'}</span>
                        <span>{card.expiry || 'MM/YY'}</span>
                      </div>
                    </div>
                    <div className="modal-form">
                      <div className="modal-field">
                        <label>Card Holder Name</label>
                        <input name="cardHolder" placeholder="John Doe"
                          value={card.cardHolder} onChange={handleCardChange} />
                      </div>
                      <div className="modal-field">
                        <label>Card Number</label>
                        <input name="cardNumber" placeholder="1234 5678 9012 3456"
                          value={card.cardNumber} onChange={handleCardChange} />
                      </div>
                      <div className="modal-row">
                        <div className="modal-field">
                          <label>Expiry</label>
                          <input name="expiry" placeholder="MM/YY"
                            value={card.expiry} onChange={handleCardChange} />
                        </div>
                        <div className="modal-field">
                          <label>CVV</label>
                          <input name="cvv" placeholder="•••" type="password"
                            value={card.cvv} onChange={handleCardChange} />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {msg && <div className={`booking-msg ${msgType}`}>{msg}</div>}

                <div className="modal-btn-row">
                  <button className="back-btn" onClick={() => { setStep(1); setMsg(''); }}>← Back</button>
                  <button className="book-confirm-btn" onClick={handlePay} disabled={loading}>
                    {loading ? 'Processing...' : `Pay ₹${selectedSeats.length * TICKET_PRICE}`}
                  </button>
                </div>
              </>
            )}

            {/* STEP 3 — Success */}
            {step === 3 && (
              <div className="success-screen">
                <div className="success-icon">🎉</div>
                <h2>Payment Successful!</h2>
                <p>Your tickets for <strong>{selectedMovie.title}</strong> are confirmed.</p>
                <div className="success-details">
                  <div className="sd-row"><span>Show Time</span><span>{showTime}</span></div>
                  <div className="sd-row"><span>Seats</span><span>{selectedSeats.join(', ')}</span></div>
                  <div className="sd-row"><span>Payment</span><span>{payMethod === 'UPI' ? `📱 ${upiId}` : '💳 Card'}</span></div>
                  <div className="sd-row"><span>Amount Paid</span><span className="sd-green">₹{selectedSeats.length * TICKET_PRICE}</span></div>
                  <div className="sd-row"><span>Transaction ID</span><span className="sd-txn">{txnId}</span></div>
                </div>
                <button className="book-confirm-btn" onClick={closeModal}>Done ✓</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Movies;
