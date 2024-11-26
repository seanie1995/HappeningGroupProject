import { React } from 'react';
import './style/EventCard.css'
import { htmlToText } from 'html-to-text'

const EventDetailsPopup = ({ event, onClose }) => {

    const eventDescription = htmlToText(event.description)

    const currentDate = new Date();

    const upcomingDates = event.dates.filter(date => new Date(date) >= currentDate).sort((a, b) => new Date(a) - new Date(b));


    const handleRedirect = (url) => {
        window.open(url);
    }

    return (
        <div className="fixed z-30 inset-0 flex-col items-center content-center justify-center align-middle bg-flesh bg-opacity-50 transition-opacity duration-300 ease-out opacity-0 animate-fadeIn max-h-screen overflow-y-auto">
            <a href="#">
                <img className="rounded-t-lg object-cover w-full" src={event.imageUrl} alt="official event image" />
            </a>
            <div className="bg-gray-300 p-5 rounded-lg w-full overflow-y-auto max-h-screen">
                <h2 className="text-xl font-bold">{event.title}</h2>
                <div className="dates-container">
                    {/* Display multiple dates if they exist, or a single date */}
                    <p><strong>Datum:</strong></p>
                    {event.dates.length > 1 ? (
                        <ul className="max-h-24 overflow-y-auto">
                            {upcomingDates.map((date, index) => (
                                <li key={index} className="text-sm">
                                    {new Date(date).toLocaleString('sv-SE', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: '2-digit',
                                        hour12: false,
                                    })}
                                </li>
                            ))}
                        </ul>

                    ) : (
                        <p>{new Date(upcomingDates[0]).toLocaleString('sv-SE', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: false,
                        })}</p>
                    )}

                </div>


                <div className="max-h-screen mb-3 "> <p className="mt-1"><strong>Beskrivning:</strong> {eventDescription || "Se biljettsidan"}</p></div>


                <p><strong>Adress:</strong> {event.venue.address}, {event.venue.city}</p>
                <p>
                    <strong>Pris från: </strong>
                    {event.lowestPrice === 0 ? "Se biljettssidan" : (event.lowestPrice !== 0 ? `${event.lowestPrice}:-` : event.highestPrice)}
                </p>

                <button>
                    <a onClick={() => handleRedirect(event.eventUrlPage)} className="mt-3 mr-5 bg-DarkPurple text-white px-4 py-2 rounded">
                        Biljetter
                    </a>
                </button>

                <button onClick={onClose} className="mt-3 bg-DarkPurple     text-white px-4 py-2 rounded">Stäng</button>
            </div>
        </div>
    );

};

export default EventDetailsPopup;
