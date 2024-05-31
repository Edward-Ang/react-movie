// src/components/Header.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
  };

  return (
    <header>
      <Link className='header-logo' to='/'>
        <img className='logo' src='./favicon/favicon.ico' alt='logo' />
        <h1 className='name'>PopWatch</h1>
      </Link>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default Header;
