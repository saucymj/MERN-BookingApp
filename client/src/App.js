import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Container } from '@chakra-ui/react'
import './App.css';

import Header from './components/Header';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SingleBlog from './pages/SingleBlog';
import Footer from './components/Footer';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ChakraProvider resetCSS="true">
    <Container maxW="100%" height="100%" p="0">
      <ApolloProvider client={client}>
        <Router>
          <Header />
            <Routes>
                <Route 
                  path="/" 
                  element={<Home />} 
                />
                <Route 
                  path="/login" 
                  element={<Login />} 
                />
                <Route 
                  path="/signup" 
                  element={<Signup />} 
                />
              <Route 
                  path="/blogs/:blogId" 
                  element={<SingleBlog />} 
                />
            </Routes>
          <Footer/>
        </Router>
      </ApolloProvider>
    </Container>
    </ChakraProvider>
  );
}

export default App;

