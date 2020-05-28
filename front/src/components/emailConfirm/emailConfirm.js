import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Logo from '../../img/logo.svg';

class EmailConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmCode: '',
      response: '',
      showError: false
    }
  }

  confirmEmailHandler = async () => {
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
      console.log('Email confirmed!');
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className="emailConfirm">
        <img src={Logo} alt="Logo" className="emailConfirm__logo"/>
        <input
          type="text"
          className="emailConfirm__input"
          value={this.state.confirmCode} 
          placeholder="Введите код подтверждения отправленный вам на почту"
          onChange={e => this.setState({confirmCode: e.target.value})}/>
        <button 
          className="emailConfirm__button"
          onClick={() => this.confirmEmailHandler()}>
            Отправить</button>
      </div>
    )
  }
}

export default withRouter(EmailConfirm);