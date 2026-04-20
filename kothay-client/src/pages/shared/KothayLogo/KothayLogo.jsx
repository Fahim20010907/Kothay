// KothayLogo.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/logo.png';

const KothayLogo = () => {
    return (
        <Link to='/'>
            <div className='flex items-end'>
                <img className='mb-1' src={logo} alt="Kothay Logo" />
                <p className='-ml-4 text-xl font-bold'><span className='text-white'>Koth</span><span className='text-amber-300'>ay</span></p>
            </div>
        </Link>
    );
};

export default KothayLogo;