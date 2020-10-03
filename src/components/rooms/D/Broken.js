import React from 'react';
import { AppContext } from '../../../AppContext';
import ClickableRoom from '../../common/ClickableRoom';
import roomDBroken from '../../../images/rooms/D/broken.png';
import roomDBrokenBlacklight from '../../../images/rooms/D/broken_blacklight.png';
import Book from './Book';

class RoomDBroken extends React.Component {
  static contextType = AppContext;

  getBook = () => {
    const { setFields, triggerSound } = this.context;
    const modalContent = <Book />;
    setFields({ modalContent });
    triggerSound('paper', 5);
  };

  render() {
    const { setFields, isBlackLightOn } = this.context;

    return (
      <ClickableRoom
        background={isBlackLightOn ? roomDBrokenBlacklight : roomDBroken}
        interactiveElementConfigs={[
          {
            boundingBox: [
              [32.1, 40.3],
              [100, 64],
            ],
            onClick: () => setFields({ activeDialogue: `It's locked.` }),
          },
          {
            boundingBox: [
              [55.2, 63.6],
              [64, 72],
            ],
            onClick: this.getBook,
          },
        ]}
      />
    );
  }
}

export default RoomDBroken;
