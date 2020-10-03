import * as _ from 'lodash';
import React from 'react';
import '../../styles/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfo,
  faCaretSquareRight,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      isHintShown: false,
      isErrorShown: false,
      isLoggedIn: !props.isLocked,
    };
  }

  showHint = () => this.setState({ isHintShown: true });
  hideHint = () => this.setState({ isHintShown: false });

  onChange = (e) => {
    const value = e.target.value;
    const valid = /^[a-zA-Z\s]*$/;
    if (valid.test(value)) this.setState({ currentPassword: _.toUpper(value) });
  };

  attemptLogin = () => {
    const { currentPassword } = this.state;
    const { onLogin, password, onError } = this.props;

    if (currentPassword === password) {
      this.setState({
        isLoggedIn: true,
      });
      return onLogin();
    }

    this.setState({
      currentPassword: '',
      isErrorShown: true,
    });
    setTimeout(() => this.setState({ isErrorShown: false }), 3000);
    onError();
  };

  render() {
    const {
      currentPassword,
      isLoggedIn,
      isHintShown,
      isErrorShown,
    } = this.state;
    const { children, hint } = this.props;

    const lockedContent = (
      <div className="login">
        <div className="row">
          <div className={isErrorShown ? 'error' : 'error hide'}>
            <FontAwesomeIcon icon={faTimes} className="icon" />
            Incorrect password
          </div>
        </div>
        <div className="row">
          <div className="inputBox">
            <input
              type="text"
              pattern="[A-Z0-9\s]+"
              onChange={(e, val) => this.onChange(e, val)}
              value={currentPassword}
            ></input>
            <div
              className="hint"
              onMouseEnter={this.showHint}
              onMouseLeave={this.hideHint}
            >
              <FontAwesomeIcon icon={faInfo} className="icon" />
            </div>
          </div>
          <FontAwesomeIcon
            icon={faCaretSquareRight}
            className="caret"
            onClick={this.attemptLogin}
          />
        </div>
        <div className="row">
          <div
            className={isHintShown ? 'popover' : 'popover hide'}
          >{`Password hint: ${hint}`}</div>
        </div>
      </div>
    );
    return (
      <div className="computer">{isLoggedIn ? children : lockedContent}</div>
    );
  }
}

export default Login;
