import React from 'react';
import { AppContext, VIEWS } from '../../../AppContext';
import ClickableRoom from '../../common/ClickableRoom';
import roomABase from '../../../images/rooms/A/full.png';
import '../../../styles/RoomA.css';

class RoomA extends React.Component {
  static contextType = AppContext;

  goToRoomB = () => {
    const { setFields, triggerSound, isABDoorLocked } = this.context;

    if (isABDoorLocked) {
      setFields({ view: VIEWS.ROOM_A_DOOR });
    } else {
      setFields({ view: VIEWS.ROOM_B_FULL });
      triggerSound('door_open');
    }
  };

  goToLocker = () => {
    const { setFields, isRoomABoxLocked } = this.context;

    if (isRoomABoxLocked) {
      setFields({ view: VIEWS.ROOM_A_LOCKER });
    } else {
      setFields({ view: VIEWS.ROOM_A_LOCKER_UNLOCKED });
    }
  };

  getTornPaperClue = (contextField) => {
    const { setFields, triggerSound } = this.context;

    const modalContent = (
      <div style={{ margin: '10% auto' }}>
        <div className="tornPaper">{this.context[contextField]}</div>
      </div>
    );
    setFields({ modalContent });
    triggerSound('paper', 5);
  };

  render() {
    const { setFields } = this.context;

    return (
      <ClickableRoom
        background={roomABase}
        interactiveElementConfigs={[
          // Flavor
          {
            boundingBox: [
              [61.5, 23],
              [66.4, 64.2],
            ],
            rotateDegrees: 2,
            onClick: () => setFields({ activeDialogue: `It's empty.` }),
          },
          {
            boundingBox: [
              [8, 0],
              [25, 93],
            ],
            rotateDegrees: -3,
            onClick: () => setFields({ activeDialogue: `Bunk bed. Fun?` }),
          },
          {
            boundingBox: [
              [70, 70],
              [100, 95],
            ],
            rotateDegrees: 30,
            onClick: () =>
              setFields({ activeDialogue: `Not sure if I have time to rest.` }),
          },
          // Door
          {
            boundingBox: [
              [71, 18],
              [79, 70],
            ],
            rotateDegrees: 3,
            onClick: this.goToRoomB,
          },
          // Computer
          {
            boundingBox: [
              [30, 35],
              [43, 55],
            ],
            onClick: () => setFields({ view: VIEWS.ROOM_A_COMPUTER }),
          },
          // Locker
          {
            boundingBox: [
              [55.5, 22.6],
              [60.5, 64.2],
            ],
            rotateDegrees: 1,
            onClick: this.goToLocker,
          },
          // Wall
          {
            boundingBox: [
              [82, 9],
              [99.7, 41],
            ],
            onClick: () => setFields({ view: VIEWS.ROOM_A_WALL }),
          },
          // Torn Paper Clue #1
          {
            boundingBox: [
              [72.8, 89.5],
              [76.5, 91.5],
            ],
            rotateDegrees: -10,
            onClick: () => this.getTornPaperClue('roomAStep1'),
          },
          // Torn Paper Clue #2
          {
            boundingBox: [
              [18.7, 70.4],
              [20, 72.8],
            ],
            rotateDegrees: 2,
            onClick: () => this.getTornPaperClue('roomAStep2'),
          },
        ]}
      />
    );
  }
}

export default RoomA;
