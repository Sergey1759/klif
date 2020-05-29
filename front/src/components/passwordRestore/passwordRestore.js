import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Logo from '../../img/logo.svg';

class PasswordRestore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmCode: '',
      newPassword: '',
      email: '',
      emailEntered: false,
      showError: false,
      response: true
    }
  }

  clickHandler = async () => {
    if (!this.state.emailEntered) {
      await fetch(`http://localhost:???`, {
        method: 'POST',
        body: JSON.stringify(this.state.confirmCode),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(response => this.setState({response}))
        .catch(error => this.setState({showError: true}))
  
      if (this.state.response) {
        this.setState({
          response: false,
          emailEntered: true
        })
      }
    } else {
      await fetch(`http://localhost:???`, {
        method: 'POST',
        body: JSON.stringify(this.state.confirmCode),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(response => this.setState({response}))
        .catch(error => this.setState({showError: true}))
  
      if (this.state.response) {
        console.log('Passwrd was changed!');
        this.props.history.push('/');
      }
    }
  }

  render() {
    return (
      <div className="passwordRestore">
        <img src={Logo} alt="Logo" className="passwordRestore__logo"/>
        {!this.state.emailEntered
          ? <input
              type="text"
              className="passwordRestore__input"
              value={this.state.email} 
              placeholder="Введите вашу почту"
              onChange={e => this.setState({email: e.target.value})}/>
          : <React.Fragment>
              <input
                type="text"
                className="passwordRestore__input"
                value={this.state.confirmCode} 
                placeholder="Введите код подтверждения отправленный вам на почту"
                onChange={e => this.setState({confirmCode: e.target.value})}/>
              <input
                type="text"
                className="passwordRestore__input"
                value={this.state.newPassword} 
                placeholder="Введите новый пароль"
                onChange={e => this.setState({newPassword: e.target.value})}/>
            </React.Fragment>
        }
        <button 
          className="passwordRestore__button"
          onClick={() => this.clickHandler()}>
            Отправить</button>
      </div>    
    )
  }
}

export default withRouter(PasswordRestore);