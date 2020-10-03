import React from 'react';
import { AppContext } from '../../../AppContext';
import ClickableRoom from '../../common/ClickableRoom';
import roomCTile2 from '../../../images/rooms/C/tile.png';
import Nonogram from '../../common/Nonogram';

class RoomCTile2 extends React.Component {
  static contextType = AppContext;

  getNonogram = () => {
    const { setFields, nonograms, nonogramsSolutionStatus } = this.context;
    const nonogram = nonograms[2];
    return (
      <div style={{ color: 'black', padding: '50px' }}>
        <Nonogram
          code={nonogram.code}
          rows={nonogram.rows}
          cols={nonogram.columns}
          solution={nonogram.solution}
          isSolved={nonogramsSolutionStatus[2]}
          onMatch={() => {
            const nonogramSolutionsStatusCopy = [...nonogramsSolutionStatus];
            nonogramSolutionsStatusCopy[2] = true;
            setFields({
              nonogramsSolutionStatus: nonogramSolutionsStatusCopy,
              activeDialogue: `This looks right!`,
            });
          }}
        />
      </div>
    );
  };

  render() {
    return (
      <ClickableRoom
        background={roomCTile2}
        interactiveElementConfigs={[
          {
            boundingBox: [
              [26, 3],
              [76, 90],
            ],
            element: this.getNonogram(),
          },
        ]}
      />
    );
  }
}

export default RoomCTile2;
