import React from 'react';
import { AppContext, VIEWS } from '../../../AppContext';
import ClickableRoom from '../../common/ClickableRoom';
import roomCBase from '../../../images/rooms/C/full.png';
import Thermostat from '../../common/Thermostat';
import '../../../styles/RoomC.scss';

class RoomC extends React.Component {
  static contextType = AppContext;

  getThermostat = () => {
    const {
      setFields,
      triggerSound,
      thermometerUnlockTemp,
      currentTemp,
      isRoomBBoxOpen,
    } = this.context;

    const modalContent = (
      <Thermostat
        startingTemp={currentTemp}
        targetTemp={thermometerUnlockTemp}
        onChange={() => triggerSound('click')}
        onMatch={() => setFields({ isRoomBBoxLocked: false })}
        onIncorrect={() => setFields({ isRoomBBoxLocked: true })}
        isLocked={isRoomBBoxOpen}
        onExit={(temp) => setFields({ currentTemp: temp })}
      />
    );

    setFields({ modalContent });
  };

  render() {
    const { setFields, triggerSound } = this.context;

    return (
      <ClickableRoom
        background={roomCBase}
        interactiveElementConfigs={[
          // Flavor
          {
            boundingBox: [
              [44, 0],
              [62, 65.5],
            ],
            onClick: () =>
              setFields({
                activeDialogue: 'Nothing interesting to see there.',
              }),
          },
          {
            boundingBox: [
              [35, 0],
              [44, 60],
            ],
            onClick: () =>
              setFields({
                activeDialogue: 'Nothing interesting to see there.',
              }),
          },
          {
            boundingBox: [
              [62, 10],
              [70, 68],
            ],
            onClick: () =>
              setFields({
                activeDialogue: 'Nothing but wall and floor back there.',
              }),
          },
          // Interactive
          {
            boundingBox: [
              [20.7, 33.3],
              [26.5, 54.1],
            ],
            onClick: () => {
              setFields({ view: VIEWS.ROOM_D_FULL });
              triggerSound('door_open');
            },
          },
          {
            boundingBox: [
              [5.6, 33.3],
              [11.5, 55],
            ],
            onClick: () => setFields({ view: VIEWS.ROOM_C_EXIT }),
          },
          {
            boundingBox: [
              [28.7, 46.5],
              [34.3, 58.5],
            ],
            onClick: () => setFields({ view: VIEWS.ROOM_C_BOXES }),
          },
          {
            boundingBox: [
              [78.4, 28],
              [81.5, 36.4],
            ],
            onClick: this.getThermostat,
          },
          {
            boundingBox: [
              [53, 21],
              [58.5, 32],
            ],
            rotateDegrees: 1,
            onClick: () => setFields({ view: VIEWS.ROOM_C_TILE_1 }),
          },
          {
            boundingBox: [
              [46.9, 43.7],
              [52.8, 54.7],
            ],
            rotateDegrees: -1,
            onClick: () => setFields({ view: VIEWS.ROOM_C_TILE_2 }),
          },
        ]}
      />
    );
  }
}

export default RoomC;
