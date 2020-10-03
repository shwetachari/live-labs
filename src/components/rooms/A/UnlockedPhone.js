import * as _ from 'lodash';
import React from 'react';
import ReactHowler from 'react-howler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPhone,
  faVolumeUp,
  faTrashAlt,
  faTh,
  faVoicemail,
  faClock,
  faStar,
  faUserCircle,
  faInfoCircle,
  faPause,
} from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../../AppContext';

class UnlockedPhone extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      showPlayOptions: false,
      isPlayingMessage: false,
    };
  }

  togglePlayOptions = () => {
    this.setState({ showPlayOptions: !this.state.showPlayOptions });
  };

  playMessage = () => {
    this.setState({ isPlayingMessage: true });
  };

  stopMessage = () => {
    this.setState({ isPlayingMessage: false });
  };

  render() {
    const { showPlayOptions, isPlayingMessage } = this.state;
    const { setFields } = this.context;
    const voicemailsFromMom = [
      {
        date: 'Today',
        duration: '00:34',
      },
      {
        date: 'Tuesday',
        duration: '01:03',
      },
      {
        date: 'Tuesday',
        duration: '00:04',
      },
      {
        date: 'Monday',
        duration: '00:58',
      },
      {
        date: 'Saturday',
        duration: '00:19',
      },
      {
        date: 'Saturday',
        duration: '00:47',
      },
      {
        date: 'Saturday',
        duration: '00:12',
      },
    ];

    return (
      <div className="unlockedPhone">
        <h1>Voicemail</h1>
        <div className="voicemails">
          <div className="record" onClick={this.togglePlayOptions}>
            <div className="left">
              <div className="contact">My Boss 👿</div>
              <div className="location">iPhone</div>
            </div>
            <div className="right">
              <div>
                <div className="day">Today</div>
                <div className="length">00:05</div>
              </div>
              <FontAwesomeIcon icon={faInfoCircle} className="blue" />
            </div>
          </div>
          {showPlayOptions && (
            <div className="playOptions">
              <div className="left">
                {isPlayingMessage ? (
                  <FontAwesomeIcon
                    icon={faPause}
                    className="icon blue"
                    onClick={this.stopMessage}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faPlay}
                    className="icon blue"
                    onClick={this.playMessage}
                  />
                )}
                <ReactHowler
                  src="/sounds/neuron_hint.mp3"
                  playing={isPlayingMessage}
                  onEnd={this.stopMessage}
                />
              </div>
              <div className="right">
                <FontAwesomeIcon icon={faVolumeUp} className="icon" />
                <FontAwesomeIcon icon={faPhone} className="icon blue" />
                <FontAwesomeIcon icon={faTrashAlt} className="icon red" />
              </div>
            </div>
          )}
          {_.map(voicemailsFromMom, (callData) => {
            return (
              <div
                className="record"
                onClick={() =>
                  setFields({
                    activeDialogue:
                      'This person should really call their mom back.',
                  })
                }
              >
                <div className="left">
                  <div className="contact">Mom</div>
                  <div className="location">San Francisco, CA</div>
                </div>
                <div className="right">
                  <div>
                    <div className="day">{callData.date}</div>
                    <div className="length">{callData.duration}</div>
                  </div>
                  <FontAwesomeIcon icon={faInfoCircle} className="blue" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="footer">
          <div className="verticalGroup">
            <FontAwesomeIcon icon={faStar} />
            <span className="text">Favorites</span>
          </div>
          <div className="verticalGroup">
            <FontAwesomeIcon icon={faClock} />
            <span className="text">Recents</span>
          </div>
          <div className="verticalGroup">
            <FontAwesomeIcon icon={faUserCircle} />
            <span className="text">Contacts</span>
          </div>
          <div className="verticalGroup">
            <FontAwesomeIcon icon={faTh} />
            <span className="text">Keypad</span>
          </div>
          <div className="verticalGroup blue">
            <FontAwesomeIcon icon={faVoicemail} />
            <span className="text">Voicemail</span>
          </div>
        </div>
      </div>
    );
  }
}

export default UnlockedPhone;
