

# Understand FullStack - Bookstore App

## Overview

The Bookstore App is a full-stack application that allows users to manage books in a bookstore. The application provides functionality to view, add, edit, and delete books, with the front end developed using React and the back end using Node.js and Express. The database used is MySQL. The front-end and back-end communicate via RESTful APIs. Creating the following application would help you understand how and what Full Stack acutally is. Happy Coding Guys!

### Tech Stack:
- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **API Requests**: Axios (for communication between frontend and backend)

The app is designed to be run locally on your machine with the backend on `localhost:4000` and the frontend on `localhost:3000`.

---

## Features

- **View All Books**: Displays a list of books in a tabular format with details such as title, author, genre, and publication year.
- **Add a New Book**: Allows users to add new books to the bookstore.
- **Edit a Book**: Users can edit details of an existing book.
- **Delete a Book**: Provides the ability to delete books from the database.

---

## Installation

### Prerequisites

- **Node.js**: Ensure that Node.js is installed on your machine. If not, you can download and install it from [here](https://nodejs.org/).
- **MySQL**: Install MySQL or use a MySQL cloud service.

### Step 1: Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/yourusername/bookstore-app.git
cd bookstore-app
```

### Step 2: Install Dependencies for Backend

Navigate to the `testing` folder (backend) and install the required dependencies:

```bash
cd testing
npm install
```

### Step 3: Set Up the Database

1. Create a MySQL database (you can name it `bookstore` or any other name).
2. Set up the `books` table with the following structure:

```sql
CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  genre VARCHAR(100),
  publication_year INT
);
```

3. Update the connection settings in `testing/db.js` with your database details:

```js
module.exports = {
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'bookstore',
};
```

### Step 4: Start the Backend Server

In the `testing` directory, start the backend server:

```bash
npm start
```

This will run the backend server on `http://localhost:4000`.

### Step 5: Install Dependencies for Frontend

Now, go to the `bookstore-app` (frontend) folder:

```bash
cd ../bookstore-app
npm install
```

### Step 6: Start the Frontend

In the `bookstore-app` directory, start the frontend server:

```bash
npm start
```

This will run the frontend server on `http://localhost:3000`.

---

## Folder Structure

The project is structured as follows:

```
bookstore-app/
│
├── testing/              # Backend folder
│   ├── controllers/      # Handles business logic for each endpoint
│   ├── models/           # Contains database interaction models
│   ├── routes/           # Defines API routes
│   ├── db.js             # MySQL connection configuration
│   └── server.js         # Main backend server setup
│
└── bookstore-app/        # Frontend folder (React)
    ├── src/
    │   ├── components/   # React components
    │   ├── App.js        # Main React component
    │   ├── index.js      # Entry point for React app
    │   └── services/     # Axios instance to handle API requests
    └── public/           # Static files (HTML, CSS)
```

---

## API Endpoints

### 1. **GET /books**

- **Description**: Fetch all books from the database.
- **Response**: Returns a list of all books in JSON format.

### 2. **GET /books/:id**

- **Description**: Fetch a specific book by its ID.
- **Response**: Returns a book object if found, otherwise a 404 status with an error message.

### 3. **POST /books**

- **Description**: Add a new book to the database.
- **Request Body**:
  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "genre": "Genre",
    "publication_year": 2023
  }
  ```
- **Response**: Returns a success message if the book is added, or an error message if the book creation fails.

### 4. **PUT /books/:id**

- **Description**: Update an existing book's details.
- **Request Body**:
  ```json
  {
    "title": "Updated Title",
    "author": "Updated Author",
    "genre": "Updated Genre",
    "publication_year": 2024
  }
  ```
- **Response**: Returns a success message if the book is updated, or an error message if the update fails.

### 5. **DELETE /books/:id**

- **Description**: Delete a book from the database.
- **Response**: Returns a success message if the book is deleted, or an error message if the deletion fails.

---

## Frontend Components

### 1. **BooksList Component**

- **Location**: `src/components/BooksList.js`
- **Description**: Displays a list of books fetched from the backend and provides options to edit or delete them.
- **Props**:
  - `onEditBook`: Function to handle the book edit action.
  - `onDeleteBook`: Function to handle the book delete action.

### 2. **AddBookForm Component**

- **Location**: `src/components/AddBookForm.js`
- **Description**: Form component to add a new book to the bookstore.
- **State**: Manages form inputs for title, author, genre, and publication year.
- **Functionality**: Sends a `POST` request to add a new book.

### 3. **EditBookForm Component**

- **Location**: `src/components/EditBookForm.js`
- **Description**: Allows editing of an existing book’s details.
- **State**: Manages form inputs for title, author, genre, and publication year.
- **Functionality**: Sends a `PUT` request to update the book details.

### 4. **Services for API Calls**

- **Location**: `src/services/api.js`
- **Description**: Contains functions to make API requests to the backend (`GET`, `POST`, `PUT`, `DELETE` requests).

---

## How Frontend and Backend Communicate

- The frontend communicates with the backend through RESTful API calls. The frontend (React) uses Axios to send HTTP requests to the backend (Node.js and Express).
- The backend handles these requests, interacts with the MySQL database to perform CRUD operations, and returns the results to the frontend in JSON format.
- The frontend then uses this data to update the UI dynamically.

### API Integration Example:

- When a user adds a book via the `AddBookForm` component, a `POST` request is made to the `/books` endpoint on the backend. The backend processes the request and adds the new book to the database.
- Similarly, when a user deletes or edits a book, the frontend makes a `DELETE` or `PUT` request, and the backend performs the corresponding operation on the database.


