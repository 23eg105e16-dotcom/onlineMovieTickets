import React from 'react';
import './SeatSelector.css';

const ROWS = ['A', 'B', 'C', 'D', 'E'];
const COLS = 10;

function SeatSelector({ selected, onChange, bookedSeats = [] }) {
  const toggle = (seat) => {
    if (bookedSeats.includes(seat)) return;
    const next = selected.includes(seat)
      ? selected.filter(s => s !== seat)
      : [...selected, seat];
    onChange(next);
  };

  return (
    <div className="seat-selector">
      <div className="screen-label">🎬 SCREEN</div>
      <div className="screen-bar" />
      <div className="seat-grid">
        {ROWS.map(row => (
          <div key={row} className="seat-row">
            <span className="row-label">{row}</span>
            {Array.from({ length: COLS }, (_, i) => {
              const seat = `${row}${i + 1}`;
              const isBooked = bookedSeats.includes(seat);
              const isSelected = selected.includes(seat);
              return (
                <button
                  key={seat}
                  className={`seat ${isBooked ? 'booked' : isSelected ? 'selected' : 'available'}`}
                  onClick={() => toggle(seat)}
                  title={seat}
                  disabled={isBooked}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="seat-legend">
        <span><span className="legend-box available" />Available</span>
        <span><span className="legend-box selected" />Selected</span>
        <span><span className="legend-box booked" />Booked</span>
      </div>
      {selected.length > 0 && (
        <div className="selected-info">
          Selected: <strong>{selected.join(', ')}</strong> ({selected.length} seat{selected.length > 1 ? 's' : ''})
        </div>
      )}
    </div>
  );
}

export default SeatSelector;
