import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'


export default function LandingPage() {
    return(
        <div className='landing-conteiner'>
            <div className='contenedor'>
                <Link to='/home'>
                    <button className='texto'>INGRESAR</button>
                </Link>
            </div>
        </div>
    )
}