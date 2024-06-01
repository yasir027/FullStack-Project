import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './booksList.css'; // Import CSS file for styling

const BooksList = ({ onEditBook, onDeleteBook }) => {
  const [books, setBooks] = useState([]);
  const [editBookId, setEditBookId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publication_year: ''
  });

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
  }, [editBookId]);

  const handleEditClick = async (bookId) => {
    setEditBookId(bookId);
    onEditBook(bookId);
    const bookToEdit = books.find(book => book.id === bookId);
    setEditFormData({
      title: bookToEdit.title,
      author: bookToEdit.author,
      genre: bookToEdit.genre,
      publication_year: bookToEdit.publication_year
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/books/${editBookId}`, editFormData);
      setEditBookId(null);
      alert('Book updated successfully!');
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Failed to update book. Please try again.');
    }
  };

  const handleDeleteClick = async (bookId) => {
    try {
      await axios.delete(`http://localhost:4000/books/${bookId}`);
      setBooks(books.filter(book => book.id !== bookId));
      alert('Book deleted successfully!');
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Failed to delete book. Please try again.');
    }
  };

  return (
    <div>
      <h2>Books</h2>
      <div className="book-headlines">
        <div className="attribute">Title</div>
        <div className="attribute">Author</div>
        <div className="attribute">Genre</div>
        <div className="attribute">Publication Year</div>
        <div className="attribute">Actions</div>
      </div>
      <ul className="book-list">
        {books.map(book => (
          <li key={book.id} className="book-item">
            <div className="book-details">
              <div className="attribute">{book.title}</div>
              <div className="attribute">{book.author}</div>
              <div className="attribute">{book.genre}</div>
              <div className="attribute">{book.publication_year}</div>
              <div className="attribute">
                <button className="edit-button" onClick={() => handleEditClick(book.id)}>Edit</button>
                <button className="delete-button" onClick={() => handleDeleteClick(book.id)}>Delete</button>
              </div>
            </div>
            {editBookId === book.id && (
              <form className="edit-form" onSubmit={handleEditSubmit}>
                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditChange}
                  placeholder="Title"
                />
                <input
                  type="text"
                  name="author"
                  value={editFormData.author}
                  onChange={handleEditChange}
                  placeholder="Author"
                />
                <input
                  type="text"
                  name="genre"
                  value={editFormData.genre}
                  onChange={handleEditChange}
                  placeholder="Genre"
                />
                <input
                  type="text"
                  name="publication_year"
                  value={editFormData.publication_year}
                  onChange={handleEditChange}
                  placeholder="Publication Year"
                />
                <button type="submit">Save Changes</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
