import axios from "axios";
import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import ChooseDateButton from "../components/ChooseDate";
import ReactPaginate from "react-paginate";

const EventPage = () => {
    const [events, setEvents] = useState([]);
    const [displayedEvents, setDisplayedEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);

    const eventsPerPage = 10;

    const ticketMasterEndpoint = 'https://localhost:7261/TicketMasterAPI/getEvents';
    const visitStockholmEndpoint = 'https://localhost:7261/VisitStockholmAPI/getEvents';
    const KBEventsEndpoint = 'https://localhost:7621/KBEventAPI/getEvents'

    const normalizeImageUrl = (url) => {
        if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
            return `https://${url}`;
        }
        return url;
    };

    // Fetch events from both APIs with pagination
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);

                const [response1, response2] = await Promise.all([
                    axios.get(ticketMasterEndpoint),
                    axios.get(visitStockholmEndpoint),
                ]);

                let allEvents = [...response1.data, ...response2.data];

                // Normalize image URLs
                allEvents = allEvents.map((event) => ({
                    ...event,
                    imageUrl: normalizeImageUrl(event.imageUrl),
                }));

                console.log("All Events with Normalized URLs:", allEvents);

                // Sort and remove duplicates
                const sortedEvents = allEvents.sort((a, b) => {
                    const dateA = new Date(a.dates[0]);
                    const dateB = new Date(b.dates[0]);
                    return dateA - dateB;
                });

                const seen = new Set();
                const uniqueEvents = sortedEvents.filter((event) => {
                    const uniqueKey = `${event.name}-${event.dates[0]}-${event.location}`;
                    if (seen.has(uniqueKey)) {
                        return false;
                    }
                    seen.add(uniqueKey);
                    return true;
                });

                console.log("Unique Events:", uniqueEvents);

                setEvents(uniqueEvents);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching events:", error);
                setError(error);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []); // Empty array to only run once on mount

    // Handle date selection and filter events
    const handleDateSelect = (date) => {
        setSelectedDate(date); // Update selected date
    };

    // Filter events based on the selected date
    useEffect(() => {
        if (selectedDate) {
            const filteredEvents = events.filter((event) =>
                event.dates.some((eventDateString) => {
                    const eventDate = new Date(eventDateString); // Parse the date string into a Date object
                    return eventDate >= selectedDate; // Check if the event's date is on or after the selected date
                })
            );
            setDisplayedEvents(filteredEvents.slice(0, eventsPerPage)); // Set filtered events to the state
        } else {
            setDisplayedEvents(events.slice(0, eventsPerPage)); // Show all events if no date is selected
        }
    }, [selectedDate, events]);

    // Handle page change in ReactPaginate
    const handlePageChange = ({ selected }) => {
        setPage(selected + 1); // ReactPaginate uses 0-based indexing, so add 1
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Enables smooth scrolling
        });
    };

    // Paginate the events based on the current page
    useEffect(() => {
        const startIndex = (page - 1) * eventsPerPage;
        const endIndex = startIndex + eventsPerPage;
        setDisplayedEvents(events.slice(startIndex, endIndex));
    }, [page, events]);

    return (
        <main className="bg-DarkPurple">
            <div className="-z-20">
                <ChooseDateButton onDateSelect={handleDateSelect} />
            </div>

            <div className="min-h-screen pt-10  bg-DarkPurple flex flex-col align-middle justify-evenly content-evenly">
                {displayedEvents.map((event) => (
                    <EventCard key={event.eventId} event={event} />
                ))}

                {loading && (
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full border-t-4 border-white border-solid w-16 h-16"></div>
                    </div>
                )}
                {error && <div>Error loading events: {error.message}</div>}

                {/* Pagination Controls */}
                <ReactPaginate
                    pageCount={Math.ceil(events.length / eventsPerPage)} // Total number of pages
                    pageRangeDisplayed={2} // Number of pages to show in pagination
                    marginPagesDisplayed={1} // Number of pages to show on either side of the current page
                    onPageChange={handlePageChange}
                    pageClassName="px-1 mx-1 border-2 rounded-lg "
                    containerClassName="pagination flex justify-center my-8 border-black ml-10 bg-white py-2 text-l "
                    activeClassName="bg-DarkPurple text-white rounded-lg"
                    previousLabel="Previous "
                    nextLabel="Next"
                    previousClassName="px-1 border-2 rounded-lg"
                    nextClassName='px-1 border-2 rounded-lg'
                />
            </div>
        </main>
    );
};

export default EventPage;
