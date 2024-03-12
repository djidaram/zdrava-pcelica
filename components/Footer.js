import React from 'react';


const Footer = ({ title }) => {
    return (
        <div className='footer'>
            <span className='copy-right'>{title}&copy; 2021.</span>
        </div>
    );
};

export default Footer;
