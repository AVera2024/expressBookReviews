const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }

public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.query.username;
    const password = req.query.password;
  
    if (username && password) {
      if (!doesExist(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user. Username and/or password not provided"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
});

//Task 10
//public_users.get('/', async function (req, res) {
    //let bookList = await getBooksPromise(books);
    //res.send(bookList);
//});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
    const book = Object.values(books).find(book => book.isbn === isbn);

    if (book) {
        res.send(JSON.stringify(book, null, 4));
    } else {
        res.send(`Book with ISBN ${isbn} not found.`);
    }
});

//Task 11
//public_users.get('/isbn/:isbn', function (req, res) {
    //const isbn = req.params.isbn;
    //getBooksPromise(books[isbn])
    //.then(
        //result => res.send(result),
        //error => res.send(error)
    //)
 //});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
    const book = Object.values(books).find(book => book.author === author);

    if (book) {
        res.send(JSON.stringify(book, null, 4));
    } else {
        res.send(`Book with author name ${author} not found.`);
    }
});

//Task 12
//public_users.get('/author/:author', async function (req, res) {
    //const author = req.params.author;
    //let book = [];
    //let bookList = await getBooksPromise(books);

    //Object.keys(bookList).forEach(i => {
        //if(bookList[i].author.toLowerCase() == author.toLowerCase()){
            //book.push(books[i])
        //}
    //});
    //res.send(book);
//});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
    const book = Object.values(books).find(book => book.title === title);

    if (book) {
        res.send(JSON.stringify(book, null, 4));
    } else {
        res.send(`Book with title ${title} not found.`);
    }
});

//Task 13
//public_users.get('/title/:title', async function (req, res) {
    //const title = req.params.title;
    //let book = [];
    //let bookList = await getBooksPromise(books);

    //Object.keys(bookList).forEach(i => {
        //if(bookList[i].title.toLowerCase() == title.toLowerCase()){
            //book.push(bookList[i])
        //}
    //});
    //res.send(book);
//});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
    const book = Object.values(books).find(book => book.isbn === isbn);
    const review = book.reviews;
    if (book) {
        res.send(JSON.stringify(review, null, 4));
    } else {
        res.send(`Book with ISBN ${isbn} not found.`);
    }
});

module.exports.general = public_users;
