import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

import {NavBar} from './components/navbar';
import { Home } from './components/home';
// import React, { useState } from "react";
// import { Map } from './components/Map';
// import SlideUp from './components/slideup';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Login } from './components/login';
import {Signup} from './components/signup';
import {Cam} from './components/cam';
import Webcam from 'react-webcam';
import {WaterBottle} from './components/loading';


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client = {client}>
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            <Route
              path = "/"
              element = {<WaterBottle />}
            />
            <Route
              path = "/login"
              element = {<Login />}
            />
            <Route 
              path = "/signup"
              element = {<Signup />}
            />
             <Route 
              path = "/home"
              element = {<Home />}
            />
            <Route
            path='/cam'
            element = {<Cam/>}
            />            
          </Routes>
        </div>
      </Router>
    </ApolloProvider>    
)}

export default App;