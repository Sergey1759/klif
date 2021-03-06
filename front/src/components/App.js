import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Sign from './sign/sign';
import Footer from './footer/footer';
import '../css/reset.css';
import '../css/App.scss';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Sign}/>
        </Switch>
        <Route exact path="/" component={Footer}/>
      </BrowserRouter>
    );
  }
}