import React from 'react';
import { AppContext } from '../../../AppContext';
import ClickableRoom from '../../common/ClickableRoom';
import roomEHood from '../../../images/rooms/E/hood.png';
import Beaker from '../../common/Beaker';
import '../../../styles/Hood.css';
import ReactHowler from 'react-howler';

class RoomEHood extends React.Component {
  static contextType = AppContext;

  getVials = () => {
    const { displayedPotions } = this.context;
    return (
      <div className="vials">
        {displayedPotions.map((config) => (
          <Beaker
            color={config.color}
            symbol={config.symbol}
            key={`displayed_potion_${config.symbol}`}
          />
        ))}
      </div>
    );
  };

  render() {
    const { setFields } = this.context;
    return (
      <div>
        <ClickableRoom
          background={roomEHood}
          interactiveElementConfigs={[
            {
              boundingBox: [
                [10, 31.7],
                [90, 69.9],
              ],
              onClick: () =>
                setFields({
                  activeDialogue:
                    'Cue the flashbacks to high school chemistry.',
                }),
            },
            {
              boundingBox: [
                [18, 70],
                [82, 91],
              ],
              onClick: () =>
                setFields({
                  activeDialogue: 'I wonder what these vials are for.',
                }),
              element: this.getVials(),
            },
            {
              boundingBox: [
                [76, 23],
                [90.5, 31.6],
              ],
              onClick: () =>
                setFields({
                  activeDialogue: `Don't think I should be messing with those.`,
                }),
            },
          ]}
        />
        <ReactHowler src="/sounds/bubbling.mp3" playing loop />
      </div>
    );
  }
}

export default RoomEHood;
