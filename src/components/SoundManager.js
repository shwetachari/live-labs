import * as _ from 'lodash';
import React from 'react';
import ReactHowler from 'react-howler';
import { AppContext } from '../AppContext';

class SoundManager extends React.Component {
  static contextType = AppContext;

  removeSound = (id) => {
    const { activeSounds, setFields } = this.context;
    const doneSoundIndex = _.findIndex(activeSounds, { id });
    const updatedSounds = [
      ..._.slice(activeSounds, 0, doneSoundIndex),
      ..._.slice(activeSounds, doneSoundIndex + 1),
    ];
    setFields({ activeSounds: updatedSounds });
  };

  render() {
    const { activeSounds } = this.context;

    return (
      <div>
        {_.map(activeSounds, ({ id, soundFile, volume }) => (
          <ReactHowler
            src={`/sounds/${soundFile}.mp3`}
            key={id}
            onEnd={() => this.removeSound(id)}
            volume={volume || 1}
          />
        ))}
      </div>
    );
  }
}

export default SoundManager;
