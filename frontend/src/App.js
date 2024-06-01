import React, { useState } from 'react';
import BooksList from './components/BooksList';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import DeleteBook from './components/DeleteBook';
import Navbar from './components/Navbar';

function App() {
  const [page, setPage] = useState('books');
  const [editBookId, setEditBookId] = useState(null);
  const [deleteBookId, setDeleteBookId] = useState(null);

  const renderPage = () => {
    switch (page) {
      case 'books':
        return <BooksList onEditBook={setEditBookId} onDeleteBook={setDeleteBookId} />;
      case 'add':
        return <AddBook />;
      case 'edit':
        return <EditBook bookId={editBookId} />;
      case 'delete':
        return <DeleteBook bookId={deleteBookId} />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <Navbar setPage={setPage} />
      {renderPage()}
    </div>
  );
}

export default App;
