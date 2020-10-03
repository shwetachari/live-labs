import React from 'react';
import { AppContext, VIEWS } from '../../../AppContext';
import ClickableRoom from '../../common/ClickableRoom';
import roomALocker from '../../../images/rooms/A/locker.png';
import KeyboardLock from '../../common/KeyboardLock';

class RoomALocker extends React.Component {
  static contextType = AppContext;

  goToUnlockedBox = () => {
    const { setFields, isRoomABoxLocked } = this.context;

    if (isRoomABoxLocked) {
      setFields({ activeDialogue: 'Hmm... The door seems to be locked.' });
    } else {
      setFields({ view: VIEWS.ROOM_A_LOCKER_UNLOCKED });
    }
  };

  getKeypad = () => {
    const {
      roomABoxCode,
      isRoomABoxLocked,
      setFields,
      triggerSound,
    } = this.context;

    if (!isRoomABoxLocked) {
      return setFields({
        activeDialogue: `I've already unlocked the box.`,
      });
    }

    const modalContent = (
      <div style={{ margin: '10% auto' }}>
        <KeyboardLock
          target={roomABoxCode}
          onKeyClick={() => triggerSound('click')}
          onMatch={() => {
            setFields({
              isRoomABoxLocked: false,
              activeDialogue: `It worked! Unlikely I could've guessed that one.`,
            });
            triggerSound('robot_blip');
          }}
        />
      </div>
    );
    setFields({ modalContent });
  };

  getOpenBox = () => {
    const { setFields, triggerSound, isRoomABoxLocked } = this.context;
    if (!isRoomABoxLocked) {
      triggerSound('open_chest');
      setFields({
        view: VIEWS.ROOM_A_LOCKER_UNLOCKED,
        activeDialogue: `An entire locked box... for one piece of paper.`,
      });
    } else {
      setFields({ activeDialogue: `The box is locked. Great.` });
    }
  };

  render() {
    const { setFields } = this.context;

    return (
      <ClickableRoom
        background={roomALocker}
        interactiveElementConfigs={[
          {
            boundingBox: [
              [42.1, 75.6],
              [52.3, 86],
            ],
            onClick: this.getKeypad,
          },
          {
            boundingBox: [
              [37.5, 56.3],
              [56.7, 73],
            ],
            onClick: this.getOpenBox,
          },
          {
            boundingBox: [
              [46, 52],
              [55.5, 62],
            ],
            onClick: () =>
              setFields({
                activeDialogue: `"The Progression of Time"`,
              }),
          },
          // Flavor
          {
            boundingBox: [
              [44.5, 6],
              [54, 24],
            ],
            rotateDegrees: -50,
            onClick: () =>
              setFields({
                activeDialogue: `Creepy blood-colored drawings. Seems like a good sign.`,
              }),
          },
          {
            boundingBox: [
              [41.5, 33],
              [48.5, 42],
            ],
            rotateDegrees: -25,
            onClick: () =>
              setFields({
                activeDialogue: `Creepy blood-colored drawings. Seems like a good sign.`,
              }),
          },
        ]}
      />
    );
  }
}

export default RoomALocker;
