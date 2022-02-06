import React from 'react';
import { ReactDOM } from 'react';

import Logo from './logo';

const NavBar = () => {
    return(
        <div className='navbar'>
            <div className='navbar-items'>
                <Logo />
                <div>Search</div>
                <div>Buttons</div>
            </div>
        </div>
    )
}

export default NavBar;