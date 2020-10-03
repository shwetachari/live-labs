import React from 'react';
import { AppContext } from '../../../AppContext';
import ClickableRoom from '../../common/ClickableRoom';
import roomBOpenBox from '../../../images/rooms/B/openbox.png';
import Nonogram from '../../common/Nonogram';

class RoomBOpenBox extends React.Component {
  static contextType = AppContext;

  getNonogram = () => {
    const {
      setFields,
      triggerSound,
      nonograms,
      nonogramsSolutionStatus,
    } = this.context;
    const nonogram = nonograms[0];
    const modalContent = (
      <div style={{ margin: '10% auto' }}>
        <Nonogram
          code={nonogram.code}
          rows={nonogram.rows}
          cols={nonogram.columns}
          solution={nonogram.solution}
          isSolved={nonogramsSolutionStatus[0]}
          onMatch={() => {
            const nonogramSolutionsStatusCopy = [...nonogramsSolutionStatus];
            nonogramSolutionsStatusCopy[0] = true;
            setFields({
              nonogramsSolutionStatus: nonogramSolutionsStatusCopy,
              activeDialogue: 'This looks right!',
            });
          }}
        />
      </div>
    );
    setFields({ modalContent });
    triggerSound('paper', 5);
  };

  render() {
    return (
      <ClickableRoom
        background={roomBOpenBox}
        interactiveElementConfigs={[
          {
            boundingBox: [
              [50, 40],
              [60, 60],
            ],
            rotateDegrees: 30,
            onClick: this.getNonogram,
          },
        ]}
      />
    );
  }
}

export default RoomBOpenBox;
