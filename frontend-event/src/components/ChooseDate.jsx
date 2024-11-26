import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ChooseDate = ({ onDateSelect }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDateOpen, setIsDateOpen] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onDateSelect(date);
        setIsDateOpen(false); // Close calendar after date selection
    };

    const handleDatePopup = () => {
        setIsDateOpen(!isDateOpen);
    };

    const handleClearDate = (e) => {
        e.stopPropagation(); // Prevent triggering the date picker popup
        setSelectedDate(null);
        onDateSelect(null); // Notify parent to show all dates
    };

    return (
        <div className="fixed bg-gray-500 w-auto p-2 my-2 mr-4 rounded-full right-0 flex justify-center items-center">
            <button
                onClick={handleDatePopup}
                className="inline-flex items-center text-lg font-medium text-black"
                type="button"
                aria-expanded={isDateOpen ? 'true' : 'false'}
                aria-haspopup="true"
            >
                {selectedDate ? (
                    <span className="flex items-center">
                        {selectedDate.toLocaleDateString('sv-SE')} {/* Display date in Swedish format */}
                        <button
                            onClick={handleClearDate}
                            className="ml-2 text-black hover:text-black"
                            aria-label="Clear date"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="17.828" height="17.828"><path d="m2.828 17.828 6.086-6.086L15 17.828 17.828 15l-6.086-6.086 6.086-6.086L15 0 8.914 6.086 2.828 0 0 2.828l6.085 6.086L0 15l2.828 2.828z" /></svg>
                        </button>
                    </span>
                ) : (
                    'Välj Datum'
                )}
            </button>

            {/* Conditionally render DatePicker only when the popup is open */}
            {isDateOpen && (
                <div className="absolute top-full right-5 w-56 mt-2 rounded-xl">
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        placeholderText="Select a date"
                        inline
                    />
                </div>
            )}
        </div>
    );
};

export default ChooseDate;
