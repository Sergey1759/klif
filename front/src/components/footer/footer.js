import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="footer__wrapper wrapper">
          <span className="footer__copyright">Copyright &copy; 2019 BabyTransfer</span>
          <div className="footer__links">
            <Link className="footer__link">Схема работы</Link>
            <Link className="footer__link">Горячая линия</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Footer);