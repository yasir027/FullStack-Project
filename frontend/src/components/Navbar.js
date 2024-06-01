import React from 'react';
import './navbar.css';

const Navbar = ({ setPage }) => {
  return (
    <nav className="navbar">
      <span className="navbar-brand">Bookstore</span>
      <span className="navbar-link" onClick={() => setPage('books')}>View Books</span>
      <span className="navbar-link" onClick={() => setPage('add')}>Add Book</span>
    </nav>
  );
}

export default Navbar;
