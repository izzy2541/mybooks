import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Books from './components/Books'
import Book from './components/Book'
import EditBook from './components/EditBook'
import AddBook from './components/AddBook'
import Register from './components/Register'
import Login from './components/Login'
import NotFound from './components/NotFound'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {

  const [books, setBooks] = useState([])
  const [query, setQuery] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    search()
    async function search() {
      let response = await axios.get(`http://localhost:3001/books?search=${query}`)
      setBooks(response.data)
    }
    let savedData = localStorage.getItem("user")
    savedData = JSON.parse(savedData)
    setUser(savedData);
  }, [query]);

  const onSaveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user))
    setUser(user)
  }

  const onLogout = (user) => {
    localStorage.removeItem("user");
    setUser(null)
  }

  const onQueryChange = (query) => {
    setQuery(query)
  }

  return (
    <Router>
      <div className="App">
        <Header user={user} logout={onLogout} onChange={onQueryChange}></Header>
        <Switch>
          <Route path="/" exact render={(props) => <Books books={books} user={user} onChange={onQueryChange} {...props} />} />
          <Route path="/register" render={(props) => <Register saveUser={onSaveUser} {...props} />} />
          <Route path="/login" render={(props) => <Login saveUser={onSaveUser} {...props} />} />
          <Route path="/book/:id" component={Book}></Route>
          <Route path="/editbook/:id" render={(props) => <EditBook user={user} {...props} />} />
          <Route path="/addBook" component={AddBook}></Route>
          <Route component={NotFound}></Route>
        </Switch>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
