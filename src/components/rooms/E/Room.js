import React from 'react';
import { AppContext, VIEWS } from '../../../AppContext';
import ClickableRoom from '../../common/ClickableRoom';
import roomEBase from '../../../images/rooms/E/full.png';

class RoomE extends React.Component {
  static contextType = AppContext;

  getViscosityData = () => {
    const { setFields, displayedPotionData } = this.context;

    const rowStyle = {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderBottom: '1px solid gray',
    };

    const cellStyle = {
      flex: 1,
      padding: 20,
    };

    const modalContent = (
      <div
        style={{
          minWidth: 500,
          margin: '0 auto',
          maxHeight: '70%',
          marginTop: '5%',
          padding: 50,
          display: 'flex',
          flexDirection: 'column',
          background: 'white',
          color: 'black',
          textAlign: 'center',
          fontSize: '20px',
          overflowY: 'scroll',
        }}
      >
        <div style={rowStyle}>
          <div style={cellStyle}>Sample</div>
          <div style={cellStyle}>Viscosity (mPa·s)</div>
        </div>
        {displayedPotionData.map(({ symbol, viscosity }) => (
          <div key={`viscosity_data_${symbol}`} style={rowStyle}>
            <div style={cellStyle}>{symbol}</div>
            <div style={cellStyle}>{viscosity}</div>
          </div>
        ))}
      </div>
    );
    setFields({ modalContent });
  };

  render() {
    const { setFields } = this.context;

    return (
      <ClickableRoom
        background={roomEBase}
        interactiveElementConfigs={[
          // Flavor
          {
            boundingBox: [
              [22, 65],
              [45, 88],
            ],
            rotateDegrees: 10,
            onClick: () =>
              setFields({ activeDialogue: 'Those cabinets are locked.' }),
          },
          {
            boundingBox: [
              [72, 33],
              [80, 47],
            ],
            rotateDegrees: 5,
            onClick: () =>
              setFields({
                activeDialogue:
                  'The tap is broken... How does this place function?',
              }),
          },
          {
            boundingBox: [
              [86, 46],
              [99.5, 79],
            ],
            rotateDegrees: 10,
            onClick: () =>
              setFields({
                activeDialogue: `Yeah, I think I'll steer clear of that.`,
              }),
          },
          {
            boundingBox: [
              [28.7, 5.5],
              [40, 22.9],
            ],
            rotateDegrees: -1,
            onClick: () =>
              setFields({
                activeDialogue: `It's too dark outside to see anything.`,
              }),
          },
          {
            boundingBox: [
              [73.4, 3],
              [83.9, 25],
            ],
            rotateDegrees: 2,
            onClick: () =>
              setFields({
                activeDialogue: `It's too dark outside to see anything.`,
              }),
          },
          {
            boundingBox: [
              [5.6, 31.5],
              [9.6, 49.2],
            ],
            onClick: () =>
              setFields({
                activeDialogue: `Doesn't seem too useful without a slide to look at.`,
              }),
          },
          // Hood
          {
            boundingBox: [
              [40.5, 8],
              [69, 35],
            ],
            rotateDegrees: 2,
            onClick: () => setFields({ view: VIEWS.ROOM_E_HOOD }),
          },
          // Wall
          {
            boundingBox: [
              [10, 7],
              [27, 44],
            ],
            rotateDegrees: -10,
            onClick: () => setFields({ view: VIEWS.ROOM_E_WALL }),
          },
          // Cabinet
          {
            boundingBox: [
              [14, 59],
              [23, 80],
            ],
            rotateDegrees: -3,
            onClick: () => setFields({ view: VIEWS.ROOM_E_CABINET }),
          },
          // Counter
          {
            boundingBox: [
              [45.5, 56.2],
              [49, 60.1],
            ],
            rotateDegrees: 7,
            onClick: this.getViscosityData,
          },
        ]}
      />
    );
  }
}

export default RoomE;
