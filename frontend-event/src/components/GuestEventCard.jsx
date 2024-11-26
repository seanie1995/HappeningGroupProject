import React, { useState, useEffect } from 'react';
import EventDetailsPopup from './EventDetailsPopup';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios'; // Make sure axios is imported

const GuestEventCard = ({ event }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const currentDate = new Date();

    // Fetch user favorites when the component mounts or userId changes  

    const futureDates = event.dates.filter(date => new Date(date) > currentDate);


    const dateDisplay = futureDates.length > 1
        ? `${new Date(futureDates[0]).toLocaleString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: false })}, flera datum`
        : new Date(futureDates[0]).toLocaleString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: false });

    useEffect(() => {
        if (isPopupOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isPopupOpen]);

    const handleDetailsClick = () => {
        console.log('Details clicked for', event.title, 'with ID:', event.eventId, event.lowestPrice, event);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className="mt-8 m-auto flex-col w-5/6 max-w-full bg-Flesh border border-gray-200 rounded-lg shadow dark:purpleDark dark:border-gray-700">
            <a href="#">
                <img className="rounded-t-lg object-cover w-full" src={event.imageUrl} alt="official event image" />
            </a>
            <div className="p-5">
                <p className="mb-3 font-normal text-black-700 dark:text-black-400">{dateDisplay}</p>
                <a href="#">
                    <h6 className="mb-2 text-2xl font-bold tracking-tight text-black">{event.title}</h6>
                </a>
                <p className="mb-4">{event.venue.name} {event.venue.city}</p>
                <div className="flex justify-between">
                    <button onClick={handleDetailsClick} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-DarkPurple rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:purpleContrast dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Detaljer
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                </div>
            </div>

            {isPopupOpen && (
                <EventDetailsPopup event={event} onClose={handleClosePopup} />
            )}
        </div>
    );
};

export default GuestEventCard;
