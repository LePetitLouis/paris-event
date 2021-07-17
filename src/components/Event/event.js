import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

import moment from 'moment'

import './event.css';

function Event(props) {
    const event = props.event;

    const [fav, setFav] = useState(false);

    /**
     * Set icon Favoris to false/true
     */
    useEffect(() => {
        if(JSON.parse(localStorage.getItem('parisevent.favorites'))){
            const eventsFav = JSON.parse(localStorage.getItem('parisevent.favorites'));
            if(eventsFav.length != 0){
                eventsFav.map(eventFav => {
                    if(eventFav.record.id == event.record.id){
                        setFav(true);
                    }
                })
            }
        }
    }, [])
    
    /**
     * Add event in Favoris (localStorage)
     */ 
    function handleAddFav(data) {
        setFav(true);
        // push event in localStorage
        if(localStorage.getItem('parisevent.favorites')){
            const eventsFav = JSON.parse(localStorage.getItem('parisevent.favorites'));
            eventsFav.push(event);
            localStorage.setItem('parisevent.favorites', JSON.stringify(eventsFav));
        }
        // create object events in localStorage
        else{
            localStorage.setItem('parisevent.favorites', JSON.stringify([data]));
        } 
    }
    
    /**
     * Remove event in Favoris (localStorage)
     */
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
                    <p>{moment(event.record.fields.date_star).format("DD/MM/YYYY à h:MM:ss")}</p>
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