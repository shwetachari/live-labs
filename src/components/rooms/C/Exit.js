import React from 'react';
import { AppContext, VIEWS } from '../../../AppContext';
import ClickableRoom from '../../common/ClickableRoom';
import roomCExit from '../../../images/rooms/C/exit.png';
import Nonogram from '../../common/Nonogram';
import Keypad from '../../common/Keypad';

class RoomCExit extends React.Component {
  static contextType = AppContext;

  getNonogramSolutions = () => {
    const { setFields, exitNonograms } = this.context;
    const modalContent = (
      <div
        className="exitNonograms"
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          maxWidth: '90%',
          justifyContent: 'space-around',
          margin: '0 auto',
          overflowX: 'scroll',
          overflowY: 'hidden',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
          {exitNonograms.slice(0, 6).map((nonogram, i) => (
            <div
              style={{ transform: 'scale(0.5)' }}
              key={`exit_nonogram_${nonogram.code}_${i}`}
            >
              <Nonogram
                rows={nonogram.rows}
                cols={nonogram.columns}
                solution={nonogram.solution}
                isSolved={true}
              />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
          {exitNonograms.slice(6).map((nonogram, i) => (
            <div
              style={{ transform: 'scale(0.5)' }}
              key={`exit_nonogram_${nonogram.code}_${i + 6}`}
            >
              <Nonogram
                rows={nonogram.rows}
                cols={nonogram.columns}
                solution={nonogram.solution}
                isSolved={true}
              />
            </div>
          ))}
        </div>
      </div>
    );
    setFields({ modalContent });
  };

  getKeypad = (isTop) => {
    const {
      exitTopCode,
      exitBottomCode,
      isExitTopLocked,
      isExitBottomLocked,
      setFields,
      triggerSound,
    } = this.context;

    const code = isTop ? exitTopCode : exitBottomCode;
    const isLocked = isTop ? isExitTopLocked : isExitBottomLocked;

    if (!isLocked) {
      return setFields({ activeDialogue: `I've already unlocked that one.` });
    }

    const modalContent = (
      <div style={{ margin: '10% auto' }}>
        <Keypad
          code={code}
          onButtonClick={() => triggerSound('beep', 0.3)}
          unlockDoor={() => {
            setFields({
              activeDialogue:
                !isExitTopLocked || !isExitBottomLocked
                  ? `That's it! Let's get out of here!`
                  : `Just one more to go!`,
              isExitTopLocked: isTop ? false : isExitTopLocked,
              isExitBottomLocked: isTop ? isExitBottomLocked : false,
            });
            triggerSound('unlock');
          }}
        />
      </div>
    );
    setFields({ modalContent });
  };

  attemptExit = () => {
    const {
      isExitTopLocked,
      isExitBottomLocked,
      setFields,
      triggerSound,
    } = this.context;

    if (isExitTopLocked || isExitBottomLocked)
      return setFields({
        activeDialogue: `This looks like my way out of here, but it's locked.`,
      });

    triggerSound('door_open');
    triggerSound('bell');
    setFields({ view: VIEWS.EXIT, isFinished: true });
  };

  render() {
    return (
      <ClickableRoom
        background={roomCExit}
        interactiveElementConfigs={[
          {
            boundingBox: [
              [31.2, 11.3],
              [63.65, 95],
            ],
            onClick: this.attemptExit,
          },
          {
            boundingBox: [
              [38, 65],
              [48.4, 77],
            ],
            onClick: this.getNonogramSolutions,
          },
          {
            boundingBox: [
              [49.5, 63.7],
              [52.9, 70],
            ],
            onClick: () => this.getKeypad(true),
          },
          {
            boundingBox: [
              [49.5, 71.7],
              [52.9, 78],
            ],
            onClick: () => this.getKeypad(false),
          },
        ]}
      />
    );
  }
}

export default RoomCExit;
