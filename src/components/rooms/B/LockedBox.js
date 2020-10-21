import React from 'react';
import { AppContext, VIEWS } from '../../../AppContext';
import ClickableRoom from '../../common/ClickableRoom';
import roomBLockedBox from '../../../images/rooms/B/lockedbox.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThermometerThreeQuarters,
  faEquals,
  faFlask,
} from '@fortawesome/free-solid-svg-icons';

class RoomBLockedBox extends React.Component {
  static contextType = AppContext;

  getIcons = () => {
    const { thermometerUnlockColor } = this.context;

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          fontSize: '5em',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          opacity: 0.9,
        }}
      >
        <FontAwesomeIcon
          icon={faThermometerThreeQuarters}
          className={thermometerUnlockColor}
        />
        <FontAwesomeIcon icon={faEquals} color="black" />
        <div style={{ fontFamily: `'Share Tech Mono', sans-serif` }}>SUM</div>
        <FontAwesomeIcon icon={faFlask} className={thermometerUnlockColor} />
        <div
          style={{
            fontFamily: `'Share Tech Mono', sans-serif`,
          }}
        >
          mPa·s
        </div>
      </div>
    );
  };

  getOpenBox = () => {
    const { setFields, triggerSound, isRoomBBoxLocked } = this.context;

    if (isRoomBBoxLocked)
      return setFields({ activeDialogue: 'The box is locked.' });

    setFields({
      isRoomBBoxOpen: true,
      view: VIEWS.ROOM_B_OPEN_BOX,
      activeDialogue: `All of that for a piece of paper?!`,
    });
    triggerSound('open_chest');
  };

  render() {
    const { setFields } = this.context;
    return (
      <ClickableRoom
        background={roomBLockedBox}
        interactiveElementConfigs={[
          {
            boundingBox: [
              [25, 40],
              [75, 60],
            ],
            onClick: () =>
              setFields({
                activeDialogue: `I wonder what this means...`,
              }),
            element: this.getIcons(),
          },
          {
            boundingBox: [
              [18, 14],
              [82, 39],
            ],
            onClick: this.getOpenBox,
          },
        ]}
      />
    );
  }
}

export default RoomBLockedBox;
