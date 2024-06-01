//inport required modules
const express = require ('express');
const cors = require('cors');

const mysql = require ('mysql2'); // importing the mysql package

//creating instance of express js, app banare
const app = express ();
const port = 4000 ; // setting the port number to for your server

app.use(cors()); // Add this line to enable CORS

//creating connection to the mysql databasea
const connection = 
mysql.createConnection
({
    host:'localhost', //my sql database host
    user: 'root' , 
    password: 'yasirsql27',
    database: 'lib'
});
connection.connect((err) => {
    if (err){
        console.error('error connecting to mysql database:', err);
        return;
    }
    console.log('connected to mysql database');
});


// Middleware to parse JSON bodies
app.use(express.json());


// define routes
// '/' get the request to the main path of the website
// req= requiest, res= response
app.get ('/', (req , res) => {
    res.send ('Mubarak, Server is Working!!!')
});

// get all books
app.get ('/books', (req, res) => {
    connection.query ('select * from books;', (error, results) => {
        if (error){
            console.error ('error retrieving books:', error);// display on the server
            res.status (500).send ('error retrieving books');// display to the client
        }
        else{
            res.status(200).json(results);
        }
    });
});

//creating a new book
app.post('/books', (req,res) => {
    const { title , author, genre, publication_year } = req.body;

    if (!title || !author){
        return res.status(400).send('Title and Author are required');  
    }
    const newBook = {
        title, author, genre, publication_year
    };

    connection.query('INSERT INTO books set ?', newBook, (error, results) => {
        if (error) {
            console.error('error creating book', error);
            res.status(500).send('error creating new book');
        }
            else {
                res.status(201).send('book created successfully');//201 is a created a response
            }
        }
    );
});
app.use(express.json());


//retrieve a single book by get command
app.get('/books/:id', (req, res) => {
    const bookid = req.params.id;   // extracting the book id from the request paramerters.
    
    connection.query('SELECT * FROM books where id = ?', [bookid], (error, results) => {
        if (error) {
            console.error ('error retrieving book by id', error);
            res.status(500).send('error retrieving book by id');
        }
            else if (results.length === 0){
                res.status(404).send('book not found');
            }
            else {
                res.status(200).json(results[0]);
            }
        
        });
    });

// Update a book
app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const { title, author } = req.body; // Only title and author are needed for update

    if (!title && !author) {
        return res.status(400).send('Title and Author are required for update');
    }

    const updatedBook = {};
    if (title) updatedBook.title = title;
    if (author) updatedBook.author = author;

    connection.query('UPDATE books SET ? WHERE id = ?', [updatedBook, bookId], (error, results) => {
        if (error) {
            console.error('Error updating book:', error);
            res.status(500).send('Error updating book');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Book not found');
        } else {
            res.status(200).send('Book updated successfully');
        }
    });
});
  
// Delete a book
app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
  
    connection.query('DELETE FROM books WHERE id = ?', [bookId], (error, results) => {
      if (error) {
        console.error('Error deleting book:', error);
        res.status(500).send('Error deleting book');
      } else if (results.affectedRows === 0) {
        res.status(404).send('Book not found');
      } else {
        res.status(200).send('Book deleted successfully');
      }
    });
  });
  
//starting the server
app.listen(4000, () => {
    console.log ('server is running on port 4000');
});

