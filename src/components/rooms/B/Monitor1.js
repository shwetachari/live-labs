import React from 'react';
import { AppContext } from '../../../AppContext';
import ReactHowler from 'react-howler';
import ClickableRoom from '../../common/ClickableRoom';
import roomBMonitor1 from '../../../images/rooms/B/monitor.png';
import {
  getInteractiveButtonConfigs,
  getElementNamesConfig,
} from './monitorUtils';
import '../../../styles/Monitor.css';

class RoomBMonitor1 extends React.Component {
  static contextType = AppContext;

  render() {
    const { setFields, elementConfigs } = this.context;

    return (
      <div>
        <ClickableRoom
          background={roomBMonitor1}
          interactiveElementConfigs={[
            ...getInteractiveButtonConfigs(elementConfigs[0], () =>
              setFields({
                activeDialogue:
                  'I wonder why only some of the buttons are lit up.',
              })
            ),
            getElementNamesConfig(elementConfigs[0], () =>
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

export default RoomBMonitor1;
