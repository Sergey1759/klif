import React, { Component } from 'react';

class EmailConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmCode: '',
      response: false,
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
      this.props.onChangePageType('sign');
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="sign-form__inputs sign-inputs">
          <input
            type="text"
            className="sign-inputs__input sign-inputs__input_confirm_theme"
            value={this.state.confirmCode} 
            placeholder="Введите код подтверждения"
            onChange={e => this.setState({confirmCode: e.target.value})}/>
        </div>
        <div className="sign-form__buttons sign-buttons">
          <button 
            className="sign-buttons__button sign-buttons__button_confirm_theme"
            onClick={() => this.confirmEmailHandler()}>
              Отправить</button>
        </div>
      </React.Fragment>
    )
  }
}

export default EmailConfirm;