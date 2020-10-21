import React from 'react';
import { AppContext, VIEWS } from '../../../AppContext';
import ClickableRoom from '../../common/ClickableRoom';
import roomDBase from '../../../images/rooms/D/full.png';
import roomDBlacklight from '../../../images/rooms/D/full_blacklight.png';
import shapePicture from '../../../images/rooms/D/shape_picture.png';
import '../../../styles/RoomD.scss';

class RoomD extends React.Component {
  static contextType = AppContext;

  showPicture = () => {
    const { setFields, isBlackLightOn } = this.context;
    const modalContent = (
      <img
        style={{
          width: '40%',
          height: 'auto',
          margin: '10% auto',
          padding: '2%',
          background: isBlackLightOn ? 'purple' : 'white',
          cursor: 'pointer',
        }}
        src={shapePicture}
        className="butterflyPicture"
        onClick={() =>
          setFields({ activeDialogue: 'This picture looks out of place.' })
        }
        alt="Butterfly"
      />
    );
    setFields({ modalContent });
  };

  goToRoomE = () => {
    const { setFields, triggerSound, isDEDoorLocked } = this.context;

    if (isDEDoorLocked) {
      return setFields({ view: VIEWS.ROOM_D_DOOR });
    }

    setFields({ view: VIEWS.ROOM_E_FULL });
    triggerSound('door_open');
  };

  goToSwitch = () => {
    const { setFields, isBlackLightOn } = this.context;

    if (isBlackLightOn) {
      return setFields({
        activeDialogue: `I've already turned on the blacklight.`,
      });
    }

    setFields({ view: VIEWS.ROOM_D_SWITCH });
  };

  render() {
    const { isBlackLightOn, setFields } = this.context;

    return (
      <ClickableRoom
        background={isBlackLightOn ? roomDBlacklight : roomDBase}
        interactiveElementConfigs={[
          // Door
          {
            boundingBox: [
              [73.4, 41.9],
              [89.5, 72],
            ],
            onClick: this.goToRoomE,
          },
          // Broken
          {
            boundingBox: [
              [5.5, 42],
              [35, 70],
            ],
            rotateDegrees: 3,
            onClick: () =>
              setFields({
                activeDialogue: `I wonder why this glass is broken.`,
                view: VIEWS.ROOM_D_BROKEN,
              }),
          },
          // Light Switch
          {
            boundingBox: [
              [38, 46.5],
              [43, 54],
            ],
            onClick: this.goToSwitch,
          },
          // Picture
          {
            boundingBox: [
              [54, 40],
              [58, 55],
            ],
            onClick: this.showPicture,
          },
          // Flavor
          {
            boundingBox: [
              [5, 5],
              [48, 40],
            ],
            onClick: () =>
              setFields({
                activeDialogue: `I wonder what's in there.`,
              }),
          },
        ]}
      />
    );
  }
}

export default RoomD;
