import React from 'react';
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <header>
      <div className='container'></div>
      <Link to='/'>
        <h1>Workout Buddy</h1>
      </Link>
    </header>
  );
};

export default Navbar;