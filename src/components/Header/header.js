import React from 'react';

import { NavLink } from 'react-router-dom';
import './header.css';

function header() {
    return (
        <header>
            <ul className="main-menu">
                <NavLink to="/" exact activeClassName="selected">Accueil</NavLink>
                <NavLink to="/search" exact activeClassName="selected">Recherche</NavLink>
                <NavLink to="/fav" exact activeClassName="selected">Favoris</NavLink>
            </ul>
        </header>
    );
}

export default header;