import React from 'react';
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <header className='h-20 bg-blue-50 '>
      <div className='py-6 pl-6'  >
      <Link to='/'>
        <h1 className='text-xl font-bold text-primary'>Workout Tracker</h1>
      </Link>
      </div>
    </header>
  );
};

export default Navbar;