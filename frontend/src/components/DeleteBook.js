import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BooksList = ({ setEditBookId, setDeleteBookId }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleEditClick = (bookId) => {
    setEditBookId(bookId);
  };

  const handleDeleteClick = (bookId) => {
    setDeleteBookId(bookId);
  };

  return (
    <div>
      <h2>Books</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} by {book.author}
            <button onClick={() => handleEditClick(book.id)}>Edit</button>
            <button onClick={() => handleDeleteClick(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
