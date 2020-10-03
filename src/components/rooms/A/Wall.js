import React from 'react';
import { AppContext, VIEWS } from '../../../AppContext';
import ClickableRoom from '../../common/ClickableRoom';
import Swing from '../../common/Swing';
import roomAWall from '../../../images/rooms/A/wall.png';
import painting from '../../../images/rooms/A/painting.png';

class RoomAWall extends React.Component {
  static contextType = AppContext;

  render() {
    const { roomASymbol, triggerSound } = this.context;

    return (
      <ClickableRoom
        background={roomAWall}
        interactiveElementConfigs={[
          {
            boundingBox: [
              [40, 14],
              [65, 70],
            ],
            element: (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    position: 'absolute',
                    display: 'block',
                    textAlign: 'center',
                    top: '30%',
                    zIndex: 1,
                    fontSize: 100,
                    opacity: 0.5,
                  }}
                >
                  {roomASymbol}
                </div>
                <Swing>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      zIndex: 10,
                    }}
                    onClick={() => triggerSound('creak')}
                  >
                    <img
                      src={painting}
                      style={{
                        width: '92%',
                        height: '94%',
                        position: 'absolute',
                        objectFit: 'cover',
                        padding: '4%',
                        backgroundColor: '#755449',
                        zIndex: 10,
                      }}
                    />
                  </div>
                </Swing>
              </div>
            ),
          },
        ]}
      />
    );
  }
}

export default RoomAWall;
