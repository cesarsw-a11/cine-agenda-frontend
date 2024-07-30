import { useState } from 'react';
import { useEffect } from 'react';

interface SeatSelectorProps {
  auditorium: string;
  onSeatSelect: (seats: number[]) => void;
}


const SeatSelector: React.FC<SeatSelectorProps> = ({ onSeatSelect, auditorium }) => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [seats, setSeats] = useState<number[]>([]);

  useEffect(() => {
    const numberOfSeats = auditorium === 'Sala C' ? 30 : 20;
    setSeats(Array.from({ length: numberOfSeats }, (_, i) => i + 1));
  }, [auditorium]);

  const handleSeatClick = (seat: number) => {
    const updatedSeats = selectedSeats.includes(seat)
      ? selectedSeats.filter((s) => s !== seat)
      : [...selectedSeats, seat];
    setSelectedSeats(updatedSeats);
    onSeatSelect(updatedSeats);
  };

  return (
    <div className="container mx-auto p-4">
          <p className='text-center'>Screen</p>
    <hr />
    <div className="grid grid-cols-6 gap-2">
      {seats.map((seat) => (
        <button
          key={seat}
          className={`p-2 rounded-md ${selectedSeats.includes(seat) ? 'bg-green-500' : 'bg-slate-600'}`}
          onClick={() => handleSeatClick(seat)}
        >
          {seat}
        </button>
      ))}
    </div>
    </div>
  );
}

export default SeatSelector;
