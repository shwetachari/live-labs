import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../../AppContext';
import ClickableRoom from '../../common/ClickableRoom';
import roomEWallUnlocked from '../../../images/rooms/E/wall_unlocked.png';
import Nonogram from '../../common/Nonogram';
import '../../../styles/RoomE.css';

class RoomEWallUnlocked extends React.Component {
  static contextType = AppContext;

  getNonogram = () => {
    const { setFields, nonograms, nonogramsSolutionStatus } = this.context;
    const nonogram = nonograms[3];
    const modalContent = (
      <div style={{ margin: '10% auto' }}>
        <Nonogram
          code={nonogram.code}
          rows={nonogram.rows}
          cols={nonogram.columns}
          solution={nonogram.solution}
          isSolved={nonogramsSolutionStatus[3]}
          onMatch={() => {
            const nonogramSolutionsStatusCopy = [...nonogramsSolutionStatus];
            nonogramSolutionsStatusCopy[3] = true;
            setFields({
              nonogramsSolutionStatus: nonogramSolutionsStatusCopy,
              activeDialogue: `Got it!`,
            });
          }}
        />
      </div>
    );
    setFields({ modalContent });
  };

  getHint = () => {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          fontSize: '40px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          opacity: 0.9,
        }}
      >
        <div
          style={{
            fontFamily: `'Share Tech Mono', sans-serif`,
            paddingRight: '10px',
          }}
        >
          SUM
        </div>
        <FontAwesomeIcon icon={faBalanceScale} />
      </div>
    );
  };

  render() {
    const { setFields } = this.context;

    return (
      <ClickableRoom
        background={roomEWallUnlocked}
        interactiveElementConfigs={[
          {
            boundingBox: [
              [27.5, 1],
              [72.2, 46.7],
            ],
            onClick: () =>
              setFields({
                activeDialogue: `Don't think I need that periodic table anymore.`,
              }),
          },
          {
            boundingBox: [
              [52, 55.5],
              [58, 66.5],
            ],
            rotateDegrees: 35,
            onClick: this.getNonogram,
          },
          {
            boundingBox: [
              [58, 80],
              [67, 85],
            ],
            element: this.getHint(),
            onClick: () =>
              setFields({ activeDialogue: `No need for that anymore!` }),
          },
        ]}
      />
    );
  }
}

export default RoomEWallUnlocked;
