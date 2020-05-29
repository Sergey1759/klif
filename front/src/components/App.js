import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Sign from './sign/sign';
import EmailConfirm from './emailConfirm/emailConfirm';
import PasswordRestore from './passwordRestore/passwordRestore';
import '../css/reset.css';
import '../css/App.scss';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Sign}/>
          <Route path="/emailConfirm" component={EmailConfirm}/>
          <Route path="/passwordRestore" component={PasswordRestore}/>
        </Switch>
      </BrowserRouter>
    );
  }
}