import React, { Component } from 'react';

class PasswordRestore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmCode: '',
      newPassword: '',
      email: '',
      emailEntered: false,
      showError: false,
      response: false
    }
  }

  clickHandler = async () => {
    if (!this.state.emailEntered) {
      await fetch(`http://localhost:???`, {
        method: 'POST',
        body: JSON.stringify(this.state.email),
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
        body: JSON.stringify({confirmCode: this.state.confirmCode, newPassword: this.state.newPassword}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(response => this.setState({response}))
        .catch(error => this.setState({showError: true}))
  
      if (this.state.response) {
        console.log('Passwrd was changed!');
        this.props.onChangePageType('sign');
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="sign-form__inputs sign-inputs">
          {!this.state.emailEntered
            ? <input
                type="email"
                className="sign-inputs__input sign-inputs__input_confirm_theme"
                value={this.state.email} 
                placeholder="Введите вашу почту"
                onChange={e => this.setState({email: e.target.value})}/>
            : <React.Fragment>
                <input
                  type="text"
                  className="sign-inputs__input sign-inputs__input_confirm_theme"
                  value={this.state.confirmCode} 
                  placeholder="Введите код подтверждения"
                  onChange={e => this.setState({confirmCode: e.target.value})}/>
                <input
                  type="password"
                  className="sign-inputs__input sign-inputs__input_confirm_theme"
                  value={this.state.newPassword} 
                  placeholder="Введите новый пароль"
                  onChange={e => this.setState({newPassword: e.target.value})}/>
              </React.Fragment>
          }
        </div>
        <div className="sign-form__buttons sign-buttons">
          <button 
            className="sign-buttons__button sign-buttons__button_confirm_theme"
            onClick={() => this.clickHandler()}>
              Отправить</button>
        </div>
      </React.Fragment>
    )
  }
}

export default PasswordRestore;