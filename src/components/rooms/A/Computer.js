import React from 'react';
import { AppContext } from '../../../AppContext';
import ClickableRoom from '../../common/ClickableRoom';
import LockedPhone from '../../common/LockedPhone';
import UnlockedPhone from './UnlockedPhone';
import Login from '../../common/Login';
import roomAComputer from '../../../images/rooms/A/computer.png';
import keypadDiagram from '../../../images/rooms/A/keypad_diagram.png';

class RoomAComputer extends React.Component {
  static contextType = AppContext;

  getPhone = () => {
    const { setFields, roomAPhonePasscode, isPhoneLocked } = this.context;

    const modalContent = (
      <div style={{ margin: '0 auto' }}>
        <LockedPhone
          code={roomAPhonePasscode}
          isLocked={isPhoneLocked}
          unlock={() =>
            setFields({
              activeDialogue: `And we're in!`,
              isPhoneLocked: false,
            })
          }
          onEmergencyClick={() =>
            setFields({
              activeDialogue: `If only there were cell service here.`,
            })
          }
        >
          <UnlockedPhone />
        </LockedPhone>
      </div>
    );

    setFields({
      modalContent,
      activeDialogue: isPhoneLocked
        ? `Um... did someone actually leave their phone here?`
        : null,
    });
  };

  getLogin = () => {
    const {
      setFields,
      triggerSound,
      isComputerLocked,
      roomAComputerPassword,
      ABDoorCode,
    } = this.context;
    const modalContent = (
      <div style={{ width: '100%', marginTop: '10%' }}>
        <Login
          password={roomAComputerPassword}
          hint="Don't forget the whitespace between the two words and lock yourself out of your own computer again"
          isLocked={isComputerLocked}
          onLogin={() => {
            setFields({ isComputerLocked: false });
            triggerSound('robot_blip');
          }}
          onError={() => triggerSound('error', 0.3)}
        >
          <div className="unlockedComputer">
            <div className="nav">
              <div className="red circle">●</div>
              <div className="gray circle">●</div>
              <div className="green circle">●</div>
            </div>
            <div className="content">
              <div
                className="doorCode"
                onClick={() =>
                  setFields({
                    activeDialogue: `This number looks important.`,
                  })
                }
              >
                {ABDoorCode}
              </div>
              <img
                src={keypadDiagram}
                onClick={() =>
                  setFields({
                    activeDialogue: `It's some kind of electronic door lock diagram.`,
                  })
                }
                alt="Keypad"
              />
            </div>
          </div>
        </Login>
      </div>
    );

    setFields({ modalContent });
  };

  getStickyNote = () => {
    const { setFields, triggerSound, roomAStickyNote } = this.context;

    const modalContent = <div className="stickyNote">{roomAStickyNote}</div>;

    setFields({ modalContent });
    triggerSound('paper', 5);
  };

  render() {
    const { setFields } = this.context;
    return (
      <ClickableRoom
        background={roomAComputer}
        interactiveElementConfigs={[
          {
            boundingBox: [
              [23, 18.5],
              [46, 48],
            ],
            onClick: this.getLogin,
          },
          {
            boundingBox: [
              [65.3, 88.4],
              [70.2, 95.5],
            ],
            rotateDegrees: -10,
            onClick: this.getStickyNote,
          },
          {
            boundingBox: [
              [57, 82],
              [64.5, 97],
            ],
            rotateDegrees: -40,
            onClick: this.getPhone,
          },
          // Flavor
          {
            boundingBox: [
              [24, 78],
              [54.5, 94.4],
            ],
            onClick: () =>
              setFields({ activeDialogue: `A regular-looking keyboard.` }),
          },
          {
            boundingBox: [
              [40.2, 53.5],
              [63.6, 68.5],
            ],
            onClick: () =>
              setFields({
                activeDialogue: `Not sure what that's supposed to be.`,
              }),
          },
          {
            boundingBox: [
              [41.5, 56.7],
              [47, 62.3],
            ],
            onClick: () =>
              setFields({
                activeDialogue: `A tiny screen. Doesn't seem useful.`,
              }),
          },
        ]}
      />
    );
  }
}

export default RoomAComputer;
