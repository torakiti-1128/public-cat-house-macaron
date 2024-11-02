import React, { useState } from 'react';

export const DateTimePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState({
    hour: '12',
    minute: '00',
    period: 'PM',
  });

  const handleDateChange = (date: number) => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), date));
  };

  const handleTimeChange = (type: 'hour' | 'minute' | 'period', value: string) => {
    setSelectedTime({ ...selectedTime, [type]: value });
  };

  return (
    <div className="w-80 flex flex-col bg-white shadow-lg rounded-xl overflow-hidden dark:bg-neutral-900">
      <div className="p-3">
        {/* Month and Year Selector */}
        <div className="grid grid-cols-5 items-center gap-x-3 mx-1.5 pb-3">
          <button onClick={() => handleDateChange(selectedDate.getDate() - 1)} className="col-span-1 text-gray-800 hover:bg-gray-100 rounded-full focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-800">
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div className="col-span-3 flex justify-center gap-x-1 text-gray-800 dark:text-neutral-200">
            <span>{selectedDate.toLocaleString('default', { month: 'long' })}</span>
            <span>/</span>
            <span>{selectedDate.getFullYear()}</span>
          </div>
          <button onClick={() => handleDateChange(selectedDate.getDate() + 1)} className="col-span-1 text-gray-800 hover:bg-gray-100 rounded-full focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-800">
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

        {/* Days of the Week */}
        <div className="flex pb-1.5 text-center">
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
            <span key={day} className="w-10 text-sm text-gray-500 dark:text-neutral-500">{day}</span>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1">
          {[...Array(31)].map((_, i) => (
            <button key={i} onClick={() => handleDateChange(i + 1)} className={`p-1 rounded-full ${selectedDate.getDate() === i + 1 ? 'bg-blue-600 text-white' : 'text-gray-800 hover:bg-gray-100'} dark:text-neutral-200`}>
              {i + 1}
            </button>
          ))}
        </div>

        {/* Time Selector */}
        <div className="pt-3 flex justify-center gap-x-2">
          {/* Hour Selector */}
          <select onChange={e => handleTimeChange('hour', e.target.value)} value={selectedTime.hour} className="bg-white text-gray-800 p-2 rounded-lg dark:bg-neutral-900 dark:text-neutral-400">
            {Array.from({ length: 12 }, (_, i) => i + 1).map(hour => (
              <option key={hour} value={hour < 10 ? `0${hour}` : hour}>{hour}</option>
            ))}
          </select>

          <span className="text-gray-800 dark:text-neutral-200">:</span>

          {/* Minute Selector */}
          <select onChange={e => handleTimeChange('minute', e.target.value)} value={selectedTime.minute} className="bg-white text-gray-800 p-2 rounded-lg dark:bg-neutral-900 dark:text-neutral-400">
            {['00', '15', '30', '45'].map(minute => (
              <option key={minute} value={minute}>{minute}</option>
            ))}
          </select>

          {/* Period Selector */}
          <select onChange={e => handleTimeChange('period', e.target.value)} value={selectedTime.period} className="bg-white text-gray-800 p-2 rounded-lg dark:bg-neutral-900 dark:text-neutral-400">
            {['AM', 'PM'].map(period => (
              <option key={period} value={period}>{period}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Button Group */}
      <div className="py-3 px-4 flex items-center justify-end gap-x-2 border-t border-gray-200 dark:border-neutral-700">
        <button className="py-2 px-3 text-xs font-medium text-gray-800 bg-white rounded-lg shadow-sm hover:bg-gray-50 dark:bg-neutral-800 dark:text-neutral-300">キャンセル</button>
        <button className="py-2 px-3 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">適用</button>
      </div>
    </div>
  );
};

export default DateTimePicker;