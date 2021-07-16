import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import './InfoEvent.css';

function InfoEvent() {
    const param = useParams();
    const { id } = param;

    const [event, setEvent] = useState([])

    useEffect(async() => {
        await axios.get(`https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/${id}`)
        .then(res => setEvent(res.data.record))
        .catch(err => console.log(err))
    }, [])

    return (
        <main>
            {event.length != 0 &&
            <>
            <h1>{event.fields.title}</h1>
            <section className='event-details'>
                <div>
                    <img src={event.fields.cover_url}  alt={event.fields.cover_alt} />
                    <h2>{event.fields.lead_text}</h2>
                    <p dangerouslySetInnerHTML={{__html: event.fields.description}}></p>
                </div>
                <div>
                    <h3>Dates:</h3>
                    <p dangerouslySetInnerHTML={{__html: event.fields.date_description}}></p>

                    <h3>Prix:</h3>
                    <p>{event.fields.price_detail}</p>

                    <h3>S'y rendre:</h3>
                    <p>{event.fields.address_name} <br />{event.fields.address_street} <br />{event.fields.address_zipcode} {event.fields.address_city}</p>

                    <h4>En transports</h4>
                    <p>{event.fields.transport}</p>

                    <h3>Plus d'infos:</h3>
                    <div className='icon-event-details'>
                        <a href={'tel:'+event.fields.contact_phone}><FontAwesomeIcon icon={faPhone} /></a>
                        <a href={'mailto:'+event.fields.contact_mail}><FontAwesomeIcon icon={faEnvelope} /></a>
                    </div>
                </div>
            </section>
            </>
            }
        </main>
    );
}

export default InfoEvent;