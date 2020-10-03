import React from 'react';
import { AppContext } from '../../../AppContext';
import ClickableRoom from '../../common/ClickableRoom';
import roomDSwitch from '../../../images/rooms/D/switch.png';
import roomDSwitchBlacklight from '../../../images/rooms/D/switch_blacklight.png';
import Keypad from '../../common/Keypad';

class RoomDSwitch extends React.Component {
  static contextType = AppContext;

  getKeypad = () => {
    const {
      blackLightCode,
      isBlackLightOn,
      setFields,
      triggerSound,
    } = this.context;

    if (isBlackLightOn) {
      return setFields({
        activeDialogue: `I've already turned on the blacklight.`,
      });
    }

    const modalContent = (
      <div style={{ margin: '10% auto' }}>
        <Keypad
          code={blackLightCode}
          onButtonClick={() => triggerSound('beep', 0.3)}
          unlockDoor={() => {
            setFields({
              activeDialogue: 'Whoa! The lighting in here just changed.',
              isBlackLightOn: true,
            });
            triggerSound('unlock');
          }}
        />
      </div>
    );
    setFields({ modalContent });
  };

  render() {
    const { isBlackLightOn, setFields } = this.context;

    return (
      <ClickableRoom
        background={isBlackLightOn ? roomDSwitchBlacklight : roomDSwitch}
        interactiveElementConfigs={[
          {
            boundingBox: [
              [41.15, 34.7],
              [53.3, 62.3],
            ],
            onClick: this.getKeypad,
          },
          {
            boundingBox: [
              [69, 19.5],
              [90.5, 77.5],
            ],
            onClick: () =>
              setFields({ activeDialogue: `Another purple light.` }),
          },
        ]}
      />
    );
  }
}

export default RoomDSwitch;
