import { useState } from 'react';
import { format, addDays } from 'date-fns';

interface CalendarProps {
  onDateSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(new Date(), i);
      days.push(
        <button
          key={i}
          className={`p-2 rounded-md ${selectedDate === date ? 'bg-blue-500' : 'bg-slate-600'}`}
          onClick={() => handleDateClick(date)}
        >
          {format(date, 'MM/dd')}
        </button>
      );
    }
    return days;
  };

  return <div className="flex space-x-2">{renderDays()}</div>;
}

export default Calendar;
