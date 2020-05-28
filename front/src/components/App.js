import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Sign from './sign/sign';
import '../css/reset.css';
import '../css/App.scss';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Sign/>
      </BrowserRouter>
    );
  }
}