import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateTimePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected DateTime:", date);
  };

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <h1 className="text-xl font-bold">Select Date & Time</h1>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
        className="border rounded p-2"
      />
      <p className="text-gray-600">
        Selected: {selectedDate.toLocaleString()}
      </p>
    </div>
  );
}
