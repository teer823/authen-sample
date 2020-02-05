import React from 'react'
import {
  Router,
  Switch,
  Route
} from "react-router-dom";

import Header from './layout/Header.jsx'

import { 
  Container
} from "react-bootstrap";

import history from './history.js'

import Home from './views/Home.jsx'
import About from './views/About.jsx'
import Callback from './views/Callback.jsx'
import Topics from './views/Topics.jsx'

export default () => (
  <Router history={history}>
    <Header />
    <Container>
      <Switch>
        {/* <Route exact path="/" component={connectedHome} /> */}
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/callback" component={Callback} />
        <Route path="/topics" component={Topics} />
      </Switch>
    </Container>
  </Router>
)
