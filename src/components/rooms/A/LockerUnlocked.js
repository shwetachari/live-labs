import React from 'react';
import { AppContext } from '../../../AppContext';
import ClickableRoom from '../../common/ClickableRoom';
import roomALockerUnlocked from '../../../images/rooms/A/locker_unlocked.png';
import Nonogram from '../../common/Nonogram';

class RoomALockerUnlocked extends React.Component {
  static contextType = AppContext;

  getNonogram = () => {
    const {
      setFields,
      triggerSound,
      nonograms,
      nonogramsSolutionStatus,
    } = this.context;
    const nonogram = nonograms[1];
    const modalContent = (
      <div style={{ margin: '10% auto' }}>
        <Nonogram
          code={nonogram.code}
          rows={nonogram.rows}
          cols={nonogram.columns}
          solution={nonogram.solution}
          isSolved={nonogramsSolutionStatus[1]}
          onMatch={() => {
            const nonogramSolutionsStatusCopy = [...nonogramsSolutionStatus];
            nonogramSolutionsStatusCopy[1] = true;
            setFields({
              nonogramsSolutionStatus: nonogramSolutionsStatusCopy,
              activeDialogue: `Looks like one of a few solutions.`,
            });
          }}
        />
      </div>
    );
    setFields({ modalContent });
    triggerSound('paper', 5);
  };

  render() {
    const { setFields } = this.context;
    return (
      <ClickableRoom
        background={roomALockerUnlocked}
        interactiveElementConfigs={[
          {
            boundingBox: [
              [39, 63],
              [56, 73],
            ],
            onClick: () =>
              setFields({
                activeDialogue: `There's nothing else in the box.`,
              }),
          },
          {
            boundingBox: [
              [41.7, 66],
              [46.1, 73],
            ],
            rotateDegrees: -8,
            onClick: this.getNonogram,
          },
          // Flavor
          {
            boundingBox: [
              [44.5, 6],
              [54, 24],
            ],
            rotateDegrees: -50,
            onClick: () =>
              setFields({
                activeDialogue: `Creepy blood-colored drawings. Seems like a good sign.`,
              }),
          },
          {
            boundingBox: [
              [41.5, 33],
              [48.5, 42],
            ],
            rotateDegrees: -25,
            onClick: () =>
              setFields({
                activeDialogue: `Creepy blood-colored drawings. Seems like a good sign.`,
              }),
          },
        ]}
      />
    );
  }
}

export default RoomALockerUnlocked;
