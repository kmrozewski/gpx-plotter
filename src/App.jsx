import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap"

import './App.css';

import Home from './components/home/Home'
import Upload from './components/upload/Upload'

export default function App() {
  return (
    <Router>
      <Container>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">GPX Plotter</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/upload">Upload</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/upload">
            <Upload />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
    </Router>
  )
}