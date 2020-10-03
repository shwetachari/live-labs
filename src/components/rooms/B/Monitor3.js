import React from 'react';
import { AppContext } from '../../../AppContext';
import ClickableRoom from '../../common/ClickableRoom';
import roomBMonitor3 from '../../../images/rooms/B/monitor.png';
import '../../../styles/Monitor.css';
import {
  getInteractiveButtonConfigs,
  getElementNamesConfig,
} from './monitorUtils';
import ReactHowler from 'react-howler';

class RoomBMonitor3 extends React.Component {
  static contextType = AppContext;

  render() {
    const { setFields, elementConfigs } = this.context;

    return (
      <div>
        <ClickableRoom
          background={roomBMonitor3}
          interactiveElementConfigs={[
            ...getInteractiveButtonConfigs(elementConfigs[2], () =>
              setFields({
                activeDialogue:
                  'I wonder why only some of the buttons are lit up.',
              })
            ),
            getElementNamesConfig(elementConfigs[2], () =>
              setFields({ activeDialogue: `Looks like a list of elements.` })
            ),
          ]}
        />
        <ReactHowler
          src="/sounds/computer_hum.wav"
          html5={true}
          volume={1}
          playing
          loop
        />
      </div>
    );
  }
}

export default RoomBMonitor3;
