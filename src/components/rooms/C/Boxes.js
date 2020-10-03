import React from 'react';
import { AppContext } from '../../../AppContext';
import ClickableRoom from '../../common/ClickableRoom';
import roomCBoxes from '../../../images/rooms/C/boxes.png';

class RoomCBoxes extends React.Component {
  static contextType = AppContext;

  getMorseCodeKey = () => {
    const { setFields, triggerSound, morseKey } = this.context;

    const modalContent = (
      <div
        style={{
          width: '40%',
          minWidth: 400,
          maxHeight: '60%',
          margin: '10% auto',
          background: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'black',
          padding: 20,
          overflowY: 'scroll',
        }}
      >
        {morseKey.map(({ num, code }, i) => {
          return (
            <div
              key={`morse_${code}`}
              style={{
                width: '80%',
                margin: 'auto',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: 15,
                paddingBottom: 20,
                fontFamily: `'Reenie Beanie', sans-serif`,
                fontSize: '35px',
                letterSpacing: '-5px',
                wordSpacing: '5px',
                fontWeight: 'bold',
                borderBottom: i < morseKey.length - 1 ? '1px solid gray' : '',
              }}
            >
              <div style={{ fontSize: '45px' }}>{num}</div>
              <div style={{}}>{code}</div>
            </div>
          );
        })}
      </div>
    );

    setFields({ modalContent });
    triggerSound('paper', 5);
  };

  render() {
    return (
      <ClickableRoom
        background={roomCBoxes}
        interactiveElementConfigs={[
          {
            boundingBox: [
              [45.5, 28],
              [58.2, 56],
            ],
            rotateDegrees: 4,
            onClick: this.getMorseCodeKey,
          },
        ]}
      />
    );
  }
}

export default RoomCBoxes;
