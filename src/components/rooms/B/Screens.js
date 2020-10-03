import React from 'react';
import { AppContext } from '../../../AppContext';
import ClickableRoom from '../../common/ClickableRoom';
import roomBScreens from '../../../images/rooms/B/screens.png';

class RoomBScreens extends React.Component {
  static contextType = AppContext;

  getScreen(side) {
    const { roomBLeftScreen, roomBRightScreen } = this.context;

    const src = side === 'left' ? roomBLeftScreen : roomBRightScreen;
    return (
      <img
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          // TODO: remove this when background is repainted
          backgroundColor: 'white',
        }}
        src={src}
      />
    );
  }

  render() {
    const { setFields } = this.context;
    return (
      <ClickableRoom
        background={roomBScreens}
        interactiveElementConfigs={[
          {
            boundingBox: [
              [11, 21],
              [47.9, 61],
            ],
            onClick: () =>
              setFields({
                activeDialogue: `I wonder what this means...`,
              }),
            element: this.getScreen('left'),
          },
          {
            boundingBox: [
              [52.6, 21],
              [89.5, 61],
            ],
            onClick: () =>
              setFields({
                activeDialogue: `I wonder what this means...`,
              }),
            element: this.getScreen('right'),
          },
        ]}
      />
    );
  }
}

export default RoomBScreens;
