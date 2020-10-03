import * as _ from 'lodash';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLock,
  faBatteryThreeQuarters,
} from '@fortawesome/free-solid-svg-icons';
import '../../styles/Phone.css';

class LockedPhone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCode: '',
      playingShakeAnimation: false,
      playingOpenAnimation: false,
    };
  }

  lettersByIndex = [
    '',
    'ABC',
    'DEF',
    'GHI',
    'JKL',
    'MNO',
    'PQRS',
    'TUV',
    'WXYZ',
  ];

  updateCurrentCode = (val) => {
    const { currentCode, playingOpenAnimation } = this.state;
    const { code, unlock } = this.props;

    const guess = currentCode + val;

    if (guess === code) {
      this.setState({ currentCode: guess, playingOpenAnimation: true });
      return unlock();
    }

    if (guess.length === code.length) {
      this.setState({ currentCode: guess, playingShakeAnimation: true });
      setTimeout(
        () => this.setState({ currentCode: '', playingShakeAnimation: false }),
        820
      );
      return;
    }

    this.setState({ currentCode: guess });
  };

  render() {
    const { currentCode, playingShakeAnimation } = this.state;
    const { children, code, onEmergencyClick, isLocked } = this.props;

    const isUnlocked = !isLocked || currentCode === code;

    const lockScreenContent = (
      <div>
        <p className="touch">Touch ID or Enter Passcode</p>

        <div className={playingShakeAnimation ? 'passcode shake' : 'passcode'}>
          {_.times(4, (i) => (
            <span className={i < currentCode.length ? 'filled' : ''}></span>
          ))}
        </div>

        <div id="parent">
          <div className="grid">
            {_.times(9, (i) => {
              const value = i + 1;
              return (
                <button
                  className={value}
                  key={`button_${value}`}
                  onClick={() => this.updateCurrentCode(value)}
                >
                  {value}
                  <div className="letters">{this.lettersByIndex[i]}</div>
                </button>
              );
            })}
          </div>
          <button className="zero" onClick={() => this.updateCurrentCode(0)}>
            0<i id="phone" className="fa fa-phone" aria-hidden="true"></i>
          </button>

          <div className="powerBtn"></div>
          <p className="emergency" onClick={onEmergencyClick}>
            Emergency
          </p>
          <p className="cancel">Cancel</p>
        </div>
      </div>
    );

    const childrenWrapper = <div className="unlockedScreen">{children}</div>;

    return (
      <div className="phone">
        <div className="screen">
          <p className="signal">No Service</p>
          <span className="lock">
            <FontAwesomeIcon icon={faLock} />
          </span>
          <p className="percent">76%</p>
          <span className="battery">
            <FontAwesomeIcon icon={faBatteryThreeQuarters} />
          </span>

          <div className="camera"></div>
          <div className="speaker"></div>
          <div className="screenContent">
            {isUnlocked ? childrenWrapper : lockScreenContent}
          </div>

          <div className="home"></div>
        </div>
      </div>
    );
  }
}

export default LockedPhone;
