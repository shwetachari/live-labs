import React from 'react';
import { AppContext, VIEWS } from '../../../AppContext';
import ClickableRoom from '../../common/ClickableRoom';
import Speaker from '../../common/Speaker';
import roomBBase from '../../../images/rooms/B/full.png';

class RoomB extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      isPlayingMorse: true,
    };
  }

  goToBox = () => {
    const { isRoomBBoxOpen, setFields } = this.context;

    if (!isRoomBBoxOpen) setFields({ view: VIEWS.ROOM_B_LOCKED_BOX });
    else setFields({ view: VIEWS.ROOM_B_OPEN_BOX });
  };

  toggleMorse = () => {
    console.log('toggling morse');
    this.setState({
      isPlayingMorse: !this.state.isPlayingMorse,
    });
  };

  stopMorse = () => {
    this.setState({
      isPlayingMorse: false,
    });
  };

  getSpeaker = () => {
    const { isPlayingMorse } = this.state;
    const { setFields } = this.context;

    console.log({ isPlayingMorse });

    const modalContent = (
      <div
        style={{
          width: '50%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Speaker src="/sounds/morse.mp3" />
      </div>
    );

    setFields({ modalContent });
  };

  render() {
    const { setFields, triggerSound } = this.context;

    return (
      <ClickableRoom
        background={roomBBase}
        interactiveElementConfigs={[
          // Flavor
          {
            boundingBox: [
              [5, 50],
              [42, 62],
            ],
            rotateDegrees: -10,
            onClick: () =>
              setFields({
                activeDialogue: `I sure hope I don't end up on that thing.`,
              }),
          },
          {
            boundingBox: [
              [53.8, 48],
              [60.7, 62],
            ],
            onClick: () =>
              setFields({
                activeDialogue: `These drawers are filled with random medical equipment I have no idea how to use.`,
              }),
          },
          // Interactive
          {
            boundingBox: [
              [84.4, 14.7],
              [95.7, 66],
            ],
            onClick: () => {
              setFields({ view: VIEWS.ROOM_C_FULL });
              triggerSound('door_open');
            },
          },
          {
            boundingBox: [
              [74.1, 27.5],
              [77.6, 36.1],
            ],
            onClick: this.getSpeaker,
          },
          {
            boundingBox: [
              [73.5, 15.3],
              [77.3, 25.2],
            ],
            onClick: () =>
              setFields({ activeDialogue: `Interesting. A purple light.` }),
          },
          {
            boundingBox: [
              [41.5, 48.5],
              [49.6, 56.5],
            ],
            rotateDegrees: 6,
            onClick: this.goToBox,
          },
          {
            boundingBox: [
              [3, 15],
              [19, 28],
            ],
            onClick: () => setFields({ view: VIEWS.ROOM_B_SCREENS }),
          },
          {
            boundingBox: [
              [18.5, 37],
              [24.4, 44.5],
            ],
            rotateDegrees: -3,
            onClick: () => setFields({ view: VIEWS.ROOM_B_MONITOR_1 }),
          },
          {
            boundingBox: [
              [48.8, 38],
              [54, 46],
            ],
            rotateDegrees: 10,
            onClick: () => setFields({ view: VIEWS.ROOM_B_MONITOR_2 }),
          },
          {
            boundingBox: [
              [54, 39],
              [60.8, 48],
            ],
            rotateDegrees: 7,
            onClick: () => setFields({ view: VIEWS.ROOM_B_MONITOR_3 }),
          },
          {
            boundingBox: [
              [62.8, 30.7],
              [67.8, 37.6],
            ],
            rotateDegrees: 5,
            onClick: () => setFields({ view: VIEWS.ROOM_B_MONITOR_4 }),
          },
        ]}
      />
    );
  }
}

export default RoomB;
