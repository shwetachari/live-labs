import * as _ from 'lodash';
import React from 'react';
import { AppContext } from '../../../AppContext';
import ClickableRoom from '../../common/ClickableRoom';
import roomCTile1 from '../../../images/rooms/C/tile.png';

class RoomCTile1 extends React.Component {
  static contextType = AppContext;

  getClue = () => {
    const { yellowDoorKey } = this.context;

    return (
      <div className="tile1">
        <div className="yellowBoxes">
          <div className="yellowBox"></div>
          <div className="yellowBox"></div>
        </div>
        <div className="key">
          {_.map(yellowDoorKey, (num, char) => (
            <div key={`yellow_key_${num}_${char}`}>
              {num} : {char}
            </div>
          ))}
        </div>
      </div>
    );
  };

  render() {
    const { setFields } = this.context;

    return (
      <ClickableRoom
        background={roomCTile1}
        interactiveElementConfigs={[
          {
            boundingBox: [
              [26, 3],
              [76, 90],
            ],
            onClick: () => setFields({ activeDialogue: 'Interesting...' }),
            element: this.getClue(),
          },
        ]}
      />
    );
  }
}

export default RoomCTile1;
