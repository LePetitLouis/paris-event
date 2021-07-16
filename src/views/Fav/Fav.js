import React, { useEffect, useState } from 'react';
import Event from '../../components/Event/event';

function Fav() {
    const [eventFav, setEventFav] = useState([]);

    useEffect(() => {
        setEventFav(JSON.parse(localStorage.getItem("parisevent.favorites")));
    }, [])
    return (
        <div>
            <h1>Événements sauvegardé</h1>
            <section className="event-section">
                {eventFav.length == 0 ?
                <p>Aucun événements n'à été sauvegardé...</p>
                :
                    eventFav.map(event => (
                        <Event event={event} />
                    ))
                }
            </section>
        </div>
    );
}

export default Fav;