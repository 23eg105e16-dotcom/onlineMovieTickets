import React from 'react';
import './Payments.css';

function Payments({ payments, username }) {
  const myPayments = payments.filter(p => p.username === username);
  const totalSpent = myPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="payments-container">
      <div className="payments-header">
        <h2 className="payments-title">Payment History 💳</h2>
        {myPayments.length > 0 && (
          <div className="total-spent">Total Spent: <strong>₹{totalSpent}</strong></div>
        )}
      </div>

      {myPayments.length === 0 ? (
        <div className="no-payments">
          <div className="no-pay-icon">💳</div>
          <p>No payment history yet.</p>
          <p className="no-pay-sub">Book a movie ticket to see your payments here.</p>
        </div>
      ) : (
        <div className="payments-list">
          {myPayments.map(p => (
            <div key={p.id} className="payment-card">
              <div className="payment-card-left">
                <div className={`payment-status-dot ${p.status === 'SUCCESS' ? 'success' : 'failed'}`} />
                <div>
                  <div className="payment-movie">🎬 {p.movieTitle}</div>
                  <div className="payment-meta">🕐 {p.showTime} &nbsp;•&nbsp; 🪑 {p.seats} seat(s)</div>
                  <div className="payment-card-info">
                    {p.paymentMethod === 'UPI'
                      ? <>📱 UPI &nbsp;•&nbsp; <span className="upi-id-text">{p.upiId}</span></>
                      : <>💳 Card ending •••• {p.cardLast4} &nbsp;•&nbsp; {p.cardHolder}</>
                    }
                  </div>
                </div>
              </div>
              <div className="payment-card-right">
                <div className="payment-amount">₹{p.amount}</div>
                <div className={`payment-badge ${p.status === 'SUCCESS' ? 'success' : 'failed'}`}>
                  {p.status}
                </div>
                <div className="payment-method-tag">
                  {p.paymentMethod === 'UPI' ? '📱 UPI' : '💳 Card'}
                </div>
                <div className="payment-txn">{p.transactionId}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Payments;
