import React from 'react';

import Link from 'next/link';


const Header = ({ title, logo }) => {
    return (
        <header className='header'>
            <div className='title'>
                <Link href='/'>
                    <a><img src={logo} /></a>
                </Link>
                <Link href='/' id='titleContent'>
                    <a><h2>{title}</h2></a>
                </Link>
            </div>
            <Link href='#Kontakt'>
                <a><h2>Kontakt</h2></a>
            </Link>
        </header>
    );
};

export default Header;
