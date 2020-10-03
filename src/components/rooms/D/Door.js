import React from 'react';
import { AppContext, VIEWS } from '../../../AppContext';
import ClickableRoom from '../../common/ClickableRoom';
import CarouselLock from '../../common/CarouselLock';
import roomDDoor from '../../../images/rooms/D/door.png';
import roomDDoorBlacklight from '../../../images/rooms/D/door_blacklight.png';

class RoomDDoor extends React.Component {
  static contextType = AppContext;

  getLock = () => {
    const {
      setFields,
      triggerSound,
      DEDoorCode,
      isDEDoorLocked,
    } = this.context;
    if (!isDEDoorLocked)
      return setFields({ activeDialogue: `I've already unlocked the door.` });

    const modalContent = (
      <div style={{ margin: '10% auto', color: 'black' }}>
        <CarouselLock
          code={DEDoorCode}
          // initial={config.lastGuess}
          onDragStop={() => triggerSound('click')}
          onMatch={() => {
            setFields({
              isDEDoorLocked: false,
              activeDialogue: `Another door open!`,
            });
            triggerSound('unlock');
          }}
        />
      </div>
    );
    setFields({ modalContent });
  };

  goToRoomE = () => {
    const { setFields, triggerSound, isDEDoorLocked } = this.context;

    if (isDEDoorLocked)
      return setFields({ activeDialogue: `The door is locked.` });

    setFields({ view: VIEWS.ROOM_E_FULL });
    triggerSound('door_open');
  };

  render() {
    const { isBlackLightOn } = this.context;

    return (
      <ClickableRoom
        background={isBlackLightOn ? roomDDoorBlacklight : roomDDoor}
        interactiveElementConfigs={[
          {
            boundingBox: [
              [13.85, 3.2],
              [85.2, 99],
            ],
            onClick: this.goToRoomE,
          },
          {
            boundingBox: [
              [54, 49.7],
              [59.9, 55],
            ],
            onClick: this.getLock,
          },
        ]}
      />
    );
  }
}

export default RoomDDoor;
