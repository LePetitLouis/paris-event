import axios from 'axios';
import React, { useState } from 'react';

import Event from '../../components/Event/event';

import './search.css';

function Search() {
    const [search, setSearch] = useState('');
    const [listEvent, setListEvent] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        await axios.get(`https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/?search=${search}&sort=-date_start&rows=15`)
        .then(result => { 
            setListEvent(result.data.records);
            setShowResult(true);
        })
        .catch(err => console.log(err))
    }

    return (
        <main>
            <section className="search-section">
                <h1>Lister des futurs événements à Paris</h1>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <input className="input-search-section" value={search} type="text" placeholder="Recherche" onChange={handleChange} />
                    <button className="btn-search-section" type="submit">Rechercher</button>
                </form>
            </section>
            {showResult && 
                <>
                <h1>Résultat de la recherche</h1>
                <section className="event-section">
                    { listEvent.length == 0 ?
                        <p>Aucun résultat pour cette recherche...</p>
                        : 
                        listEvent.map(event => (
                            <Event key={event.record.id} event={event} />
                        ))
                    }
                </section>
                </>
            }
        </main>
    );
}

export default Search;