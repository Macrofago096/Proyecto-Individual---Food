import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Image/logo.jpg'
import './Nav.css';

export default function Nav() {
  return (
          <nav className='menubar'>
            <div className='flex'>
              <div className='tamano'>
                <img className='logo' src={Logo} alt="LogoRecipe" width="60" height="60" />
              </div>
              <Link to="/">
                <span className='colorspan'>Nona's recipes❤</span>
              </Link> 
            </div>
          </nav>
  );
};