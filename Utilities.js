import React, {useState} from 'react';
import './Utilities.css'; // Importing the CSS file for styling
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Utilities() {
    const [events, setEvents] = useState(null); // State to store events data
    const handleFindConcerts = async () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const locationData = { latitude, longitude };

            // Save location to the Flask app
            await fetch(process.env.REACT_APP_SAVE_LOCATION_URL, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(locationData),
            });

            // Fetch events
            const response = await fetch(process.env.REACT_APP_EVENTS_URL, {
                credentials: 'include'
            });
            const data = await response.json();
            setEvents(data);
        }, () => {
            alert('Unable to retrieve your location');
        });
    };


    const handleCreateBlends = () => {
        // Logic for creating vibey blends
    };

    return (
        <div className="utilities-container">
            <h1 className="utilities-title">Welcome!</h1>
            <div className="utilities-buttons">
                <button onClick={handleFindConcerts} className="button find-concerts">Find Concerts Near You</button>
                <button onClick={handleCreateBlends} className="button create-blends">Create Vibey Blends</button>
            </div>
            {events && <EventSlideshow events={events} />} {/* Render the slideshow here */}
        </div>
    );
}

function EventSlideshow({ events }) {
    // Check if events is defined and is an object
    if (!events || typeof events !== 'object') {
        return <div>No events data available</div>;
    }

    let eventSlides = []

    for (let artist in events) {
        const artistEvents = events[artist];
        const artistImage = artistEvents[0].image;
        console.log(artistImage)
        const eventsFound = artistEvents[0].found; // this is a boolean value
        if (eventsFound) {
            for (let i = 1; i < artistEvents.length; i++) {
                let event = artistEvents[i];
                eventSlides.push(
                    <div key={artist + i} className="event-card">
                        <img src={artistImage} alt={artist} />
                        <h2>{event.name}</h2>
                        <p>Date: {event.date}</p>
                        <p>Time: {event.time}</p>
                        <p>Location: {event.location.name}, {event.location.city}, {event.location.country}</p>
                        <p>Price: {event.std_price.min} - {event.std_price.max} {event.std_price.currency}</p>
                        <a href={event.ticket_url} target="_blank" rel="noopener noreferrer">Buy Tickets</a>
                    </div>
                );
            }
        } else {
            eventSlides.push(
                <div key={artist + "-no-events"} className="event-card">
                    <img src={artistImage} alt={artist} />
                    <h2>No Events Found</h2>
                    <p>Currently, there are no events available for {artist}.</p>
                </div>
            );
        }
    }

    // Slider settings
    const settings = {
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="event-slideshow">
            <Slider {...settings}>
                {eventSlides}
            </Slider>
        </div>
    );
}


export default Utilities;