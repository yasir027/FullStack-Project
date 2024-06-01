import React, { useState, useEffect } from 'react';
import './editBook.css';

function EditBook({ bookId }) {
  // State to store form input values
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  // Function to fetch book details from the backend
  useEffect(() => {
    fetchBook();
  }, [bookId]);

  const fetchBook = async () => {
    try {
      // Make a GET request to fetch book details from the backend
      const response = await fetch(`http://localhost:4000/books/${bookId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch book details');
      }
      const data = await response.json();
      // Update form input values with fetched book details
      setTitle(data.title);
      setAuthor(data.author);
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make a PUT request to update the book details in the backend
      const response = await fetch(`http://localhost:4000/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author }),
      });
      if (!response.ok) {
        throw new Error('Failed to update book');
      }
      alert('Book updated successfully!');
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Failed to update book. Please try again.');
    }
  };

  return (
    <div>
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            required
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditBook;
