import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {validate} from '../../validFramework';
import PasswordRestore from './passwordRestore/passwordRestore';
import EmailConfirm from './emailConfirm/emailConfirm';
import Mail from './mail.svg';
import Key from './key.svg';
import Restore from './restore.svg';
import Logo from '../../img/logo.svg';
import Phone from './phone.svg';
import Name from './name.svg';

class Sign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        touched: false,
        valid: false
      },
      phone: {
        value: '',
        touched: false,
        valid: false
      },
      email: {
        value: '',
        touched: false,
        valid: false
      },
      password: {
        value: '',
        touched: false,
        valid: false
      },
      signType: 'signIn',
      pageType: 'sign',
      loginResponse: false,
      registrateResponse: false,
      showError: false
    }
  }

  valuesChangeHandler = (item, value) => {
    const changedItem = {...this.state[item]};
    changedItem.touched = true;
    changedItem.value = value;
    if (item === 'name') {
      changedItem.valid = validate(value, {required: true, name: true});
      this.setState({name: changedItem});
    } else if (item === 'email') {
      changedItem.valid = validate(value, {required: true, email: true});
      this.setState({email: changedItem});
    } else if (item === 'password') {
      changedItem.valid = validate(value, {required: true, minLength: 6});
      this.setState({password: changedItem});
    } else if (item === 'phone') {
      changedItem.valid = validate(value, {required: true, minLength: 10, number: true});
      this.setState({phone: changedItem});
    }
  }

  isAllValidHandler = () => {
    const {name, email, password, phone} = this.state;
    if (this.props.signType === 'signUp') {
      return (name.valid && name.touched) && (email.valid && email.touched) && (password.valid && password.touched) && (phone.valid && phone.touched);
    } else {
      return (email.valid && email.touched) && (password.valid && password.touched);
    }
  }

  // Login
  signInHandler = async () => {
    const user = {
      user_email: this.state.email.value,
      user_password: this.state.password.value
    }

    await fetch(`http://localhost:5000/user/login`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        localStorage.setItem('token', response.token);
        console.log('logged in')
        this.setState({loginResponse: response});
      })
      .catch(error => this.setState({showError: true}))
  }

  // Registrate
  signUpHandler = async () => {
    let user_name = this.state.name.value[0].toUpperCase() + this.state.name.value.slice(1, this.state.name.value.length).toLowerCase();
    const user = {
      user_name: user_name,
      user_email: this.state.email.value,
      user_password: this.state.password.value,
      user_phone: this.state.phone.value
    }

    await fetch(`http://localhost:5000/user/signup`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => this.setState({registrateResponse: response}))
      .catch(error => this.setState({showError: true}))

    if (this.state.registrateResponse) {
      console.log('registrate');
      this.setState({pageType: 'emailConfirm'});
    }
  }

  changePageTypeHandler = pageType => {
    this.setState({
      signType: 'signIn',
      pageType,
      name: {
        value: '',
        touched: false,
        valid: false
      },
      phone: {
        value: '',
        touched: false,
        valid: false
      },
      email: {
        value: '',
        touched: false,
        valid: false
      },
      password: {
        value: '',
        touched: false,
        valid: false
      }
    })
  }

  changeSignTypeHandler = signType => {
    if (signType === 'signIn' && this.state.signType === 'signIn') {
      this.signInHandler();
    } else if (signType === 'signUp' && this.state.signType === 'signUp') {
      this.signUpHandler();
    } else {
      this.setState({
        signType,
        name: {
          value: '',
          touched: false,
          valid: false
        },
        phone: {
          value: '',
          touched: false,
          valid: false
        },
        email: {
          value: '',
          touched: false,
          valid: false
        },
        password: {
          value: '',
          touched: false,
          valid: false
        }
      })
    }
  }

  formRenderHandler = () => {
    if (this.state.pageType === 'sign') {
      const signInCls = this.state.signType === 'signIn' ? 'sign-buttons__button sign-buttons__button_active' : 'sign-buttons__button';
      const signUpCls = this.state.signType === 'signUp' ? 'sign-buttons__button sign-buttons__button_active' : 'sign-buttons__button';
      
      const clsName = !this.state.name.valid && this.state.name.touched ? "sign-inputs__input sign-inputs__input_invalid" : "sign-inputs__input";
      const clsEmail = !this.state.email.valid && this.state.email.touched ? "sign-inputs__input sign-inputs__input_invalid" : "sign-inputs__input";
      const clsPassword = !this.state.password.valid && this.state.password.touched ? "sign-inputs__input sign-inputs__input_invalid" : "sign-inputs__input";
      const clsPhone = !this.state.phone.valid && this.state.phone.touched ? "sign-inputs__input sign-inputs__input_invalid" : "sign-inputs__input";
      return (
        <React.Fragment>
          <div className="sign-form__inputs sign-inputs">
            {this.state.signType === 'signUp'
              ? <React.Fragment>
                  <div className="sign-inputs__field">
                    <img src={Name} alt="Name" className="sign-inputs__img"/>
                    <input
                      type="text"
                      className={clsName}
                      value={this.state.name.value} 
                      placeholder="Введите ваше имя"
                      onChange={e => this.valuesChangeHandler('name', e.target.value)}/>
                  </div>
                  <div className="sign-inputs__field">
                    <img src={Phone} alt="Phone" className="sign-inputs__img"/>
                    <input
                      type="text"
                      className={clsPhone}
                      value={this.state.phone.value} 
                      placeholder="Введите ваш номер телефона"
                      onChange={e => this.valuesChangeHandler('phone', e.target.value)}/>
                  </div>
                </React.Fragment>
              : null}
            <div className="sign-inputs__field">
              <img src={Mail} alt="Mail" className="sign-inputs__img"/>
              <input
                type="email"
                className={clsEmail}
                value={this.state.email.value} 
                placeholder="Введите e-mail"
                onChange={e => this.valuesChangeHandler('email', e.target.value)}/>
            </div>
            <div className="sign-inputs__field">
              <img src={Key} alt="Password" className="sign-inputs__img"/>
              <input 
                type="password"
                className={clsPassword}
                value={this.state.password.value} 
                placeholder="Введите ваш пароль"
                onChange={e => this.valuesChangeHandler('password', e.target.value)}/>
            </div>
          </div>
          {this.state.signType === 'signIn'
            ? <div className="sign-form__restore restore">
                <img src={Restore} alt="" className="restore__img"/>
                <span onClick={() => this.setState({pageType: 'passwordRestore'})} className="restore__link">Восстановить пароль</span>
              </div>
            : null}
          <div className="sign-form__buttons sign-buttons">
            <button 
              className={signInCls}
              onClick={() => this.changeSignTypeHandler('signIn')}
              disabled={!this.isAllValidHandler() && this.state.signType === 'signIn'}>
                Вход</button>
            <button 
              className={signUpCls}
              onClick={() => this.changeSignTypeHandler('signUp')}
              disabled={!this.isAllValidHandler() && this.state.signType === 'signUp'}>
                Регистрация</button>
          </div>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          {this.state.pageType === 'emailConfirm'
            ? <EmailConfirm onChangePageType={this.changePageTypeHandler}/>
            : <PasswordRestore onChangePageType={this.changePageTypeHandler}/>}
        </React.Fragment>
      )
    }
  }

  titleRenderHandler = () => {
    if (this.state.pageType === 'sign') return 'Добро пожаловать'
    else if (this.state.pageType === 'emailConfirm') return 'Подтвердите почту'
    else return 'Восстановление пароля';
  }

  render() {
    return (
      <div className="sign">
        <img src={Logo} alt="Logo" className="sign__logo"/>
        <div className="sign-form">
          <div className="sign-form__title">
            {this.titleRenderHandler()}
          </div>
          {this.formRenderHandler()}
        </div>
      </div>
    )
  }
}

export default withRouter(Sign);