import React, { useState } from 'react';
import axios from 'axios';
import './addBook.css'; // Import the CSS file

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publication_year, setPublicationYear] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const handlePublicationYearChange = (event) => {
    setPublicationYear(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:4000/books', { title, author, genre, publication_year });
      setTitle('');
      setAuthor('');
      setGenre('');
      setPublicationYear('');
      setError(null);
      setSuccess(true);
    } catch (error) {
      console.error('Error adding book:', error);
      setError('Error adding book');
      setSuccess(false);
    }
  };

  return (
    <div className="add-book-container"> {/* Apply the container class */}
      <div className="add-book-form"> {/* Apply the form class */}
        <h2>Add Book</h2>
        {error && <p>{error}</p>}
        {success && <p>Congratulations, Aapki book add hogayi :)</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" value={title} onChange={handleTitleChange} />
          </div>
          <div>
            <label htmlFor="author">Author:</label>
            <input type="text" id="author" value={author} onChange={handleAuthorChange} />
          </div>
          <div>
            <label htmlFor="genre">Genre:</label>
            <input type="text" id="genre" value={genre} onChange={handleGenreChange} />
          </div>
          <div>
            <label htmlFor="publication_year">Publication Year:</label>
            <input type="text" id="publication_year" value={publication_year} onChange={handlePublicationYearChange} />
          </div>
          <button type="submit">Add Book</button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
