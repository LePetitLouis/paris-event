import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Event from '../../components/Event/event';

import './Home.css';

function Home() {
    const [lastEvent, setLastEvent] = useState([]);
    const [showResult, setShowResult] = useState(false);

    /**
     * Retrieve the last event record
     */
    useEffect(() => {
        axios.get('https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?sort=-date_start&rows=1')
        .then(result => {
            setLastEvent(result.data.records[0]);
            setShowResult(true);
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <main>
            <section className="title-section">
                <h1>Bienvenu sur Paris Events</h1>
                <p>L'application qui permet de rechercher en direct les prochains événements Parisiens</p>
            </section>
            { showResult && 
            <section className="event-section">
                <Event key={lastEvent.record.id} event={lastEvent} />
            </section>
            }
        </main>
    );
}

export default Home;