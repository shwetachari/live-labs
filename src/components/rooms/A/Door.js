import React from 'react';
import { AppContext, VIEWS } from '../../../AppContext';
import ClickableRoom from '../../common/ClickableRoom';
import Keypad from '../../common/Keypad';
import roomADoor from '../../../images/rooms/A/door.png';

class RoomADoor extends React.Component {
  static contextType = AppContext;

  goToRoomB = () => {
    const { setFields, triggerSound, isABDoorLocked } = this.context;

    if (isABDoorLocked) {
      setFields({ activeDialogue: 'Hmm... The door seems to be locked.' });
    } else {
      setFields({ view: VIEWS.ROOM_B_FULL });
      triggerSound('door_open');
    }
  };

  getKeypad = () => {
    const {
      ABDoorCode,
      isABDoorLocked,
      setFields,
      triggerSound,
    } = this.context;

    if (!isABDoorLocked) {
      return setFields({
        activeDialogue: `I've already unlocked this door.`,
      });
    }

    const modalContent = (
      <div style={{ margin: '10% auto' }}>
        <Keypad
          code={ABDoorCode}
          onButtonClick={() => triggerSound('beep', 0.3)}
          unlockDoor={() => {
            setFields({
              activeDialogue: 'Looks like that did the trick!',
              isABDoorLocked: false,
            });
            triggerSound('unlock');
          }}
        />
      </div>
    );
    setFields({ modalContent });
  };

  render() {
    const { setFields } = this.context;

    return (
      <ClickableRoom
        background={roomADoor}
        interactiveElementConfigs={[
          {
            boundingBox: [
              [25, 1],
              [67, 99],
            ],
            onClick: this.goToRoomB,
          },
          {
            boundingBox: [
              [60.7, 69.5],
              [64.5, 77.1],
            ],
            onClick: this.getKeypad,
          },
          // Flavor
          {
            boundingBox: [
              [34.7, 20.8],
              [57, 48.5],
            ],
            onClick: () =>
              setFields({
                activeDialogue: `The window is too foggy to see what's there.`,
              }),
          },
        ]}
      />
    );
  }
}

export default RoomADoor;
