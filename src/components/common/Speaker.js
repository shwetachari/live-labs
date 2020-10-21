import React from 'react';
import ReactHowler from 'react-howler';
import speaker from '../../images/rooms/B/speaker.png';
import '../../styles/Speaker.css';

class Speaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
    };
  }

  togglePlay = () => this.setState({ isPlaying: !this.state.isPlaying });

  stopPlay = () => this.setState({ isPlaying: false });

  render() {
    const { isPlaying } = this.state;
    const { src } = this.props;

    return (
      <div
        style={{
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
        }}
        className="speaker"
      >
        <div
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          className={
            isPlaying ? 'speakerBack isPlaying' : 'speakerBack isNotPlaying'
          }
        >
          <img
            src={speaker}
            style={{
              height: '100%',
              // transform: 'translateY(50%)',
              margin: '0 auto',
              width: 'auto',
            }}
            onClick={this.togglePlay}
            alt="Speaker"
          />
          <ReactHowler src={src} playing={isPlaying} onEnd={this.stopPlay} />
        </div>
      </div>
    );
  }
}

export default Speaker;
