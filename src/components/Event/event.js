import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

import './event.css';

function Event(props) {
    const event = props.event;

    const [fav, setFav] = useState(false);

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('parisevent.favorites'))){
            const eventsFav = JSON.parse(localStorage.getItem('parisevent.favorites'));
            console.log(eventsFav);
            if(eventsFav.length != 0){
                eventsFav.map(eventFav => {
                    if(eventFav.record.id == event.record.id){
                        setFav(true);
                    }
                })
            }
        }
    }, [])
    
    function handleAddFav(data) {
        setFav(true);
        const event = data;
        if(localStorage.getItem('parisevent.favorites')){
            const eventsFav = JSON.parse(localStorage.getItem('parisevent.favorites'));
            eventsFav.push(event);
            console.log(eventsFav);
            localStorage.setItem('parisevent.favorites', JSON.stringify(eventsFav));
        }
        else{
            localStorage.setItem('parisevent.favorites', JSON.stringify([event]));
        } 
    }

    function handleRemoveFav(data) {
        const eventsFav = JSON.parse(localStorage.getItem('parisevent.favorites'));
        const removeEventFav = eventsFav.filter(event => event.record.id != data.record.id);
        localStorage.setItem('parisevent.favorites', JSON.stringify(removeEventFav));
        setFav(false);
    }

    return (
        <div className="event-card">
                <img src={event.record.fields.cover_url}  alt={event.record.fields.cover_alt} />
                { fav ?
                    <FontAwesomeIcon icon={faHeartSolid} className="icon-fav icon-heart-solid" onClick={ () => handleRemoveFav(event) } />
                    :
                    <FontAwesomeIcon icon={faHeartRegular} className="icon-fav" onClick={ () => handleAddFav(event) } />
                }
                
                <div className="event-card-info">
                    <h1>{event.record.fields.title}</h1>
                    <p>{event.record.fields.date_start}</p>
                    <p>{event.record.fields.lead_text}</p>
                    <div className="event-card-btn">
                        <Link to={{ pathname: '/event/'+ event.record.id }} >
                            En savoir plus
                            <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                    </div>
                    
                </div>
        </div>
    );
}

export default Event;