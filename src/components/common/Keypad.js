import * as _ from 'lodash';
import React from 'react';
import '../../styles/Keypad.css';

class Keypad extends React.Component {
  constructor(props) {
    super(props);

    const { code } = props;
    this.state = {
      currentCode: code
        .split('')
        .map(() => '0')
        .join(''),
      rowOptions: _.times(code.length, () => [9, ..._.times(9)]),
    };
  }

  updateCurrentCode = (i, operator) => {
    const { currentCode, rowOptions } = this.state;
    const { code, onButtonClick = _.noop } = this.props;

    const isLocked = currentCode !== code;
    if (!isLocked) return;

    let updatedNum = _.toNumber(currentCode[i]) + operator;
    updatedNum = updatedNum < 0 ? 9 : updatedNum;
    updatedNum = updatedNum > 9 ? 0 : updatedNum;
    let newCode = [...currentCode];
    newCode[i] = updatedNum;

    const newRowOptions = _.cloneDeep(rowOptions);
    const currentRowOptions = newRowOptions[i];
    newRowOptions[i] =
      operator > 0
        ? [
            ...currentRowOptions.slice(1, currentRowOptions.length),
            currentRowOptions[0],
          ]
        : [
            currentRowOptions[currentRowOptions.length - 1],
            ...currentRowOptions.slice(0, currentRowOptions.length - 1),
          ];

    this.setState({ currentCode: newCode.join(''), rowOptions: newRowOptions });
    onButtonClick();
  };

  componentDidUpdate = () => {
    const { currentCode } = this.state;
    const { code, unlockDoor } = this.props;
    if (currentCode === code && unlockDoor) {
      unlockDoor();
    }
  };

  render() {
    const { code } = this.props;
    const { currentCode, rowOptions } = this.state;

    const isLocked = currentCode !== code;

    return (
      <div className={!isLocked ? 'keypad verified' : 'keypad'}>
        <div className="screen">
          <div className="code">{currentCode}</div>
          <div className="status">{isLocked ? 'LOCKED' : 'UNLOCKED'}</div>
          <div className="scanlines"></div>
        </div>
        <div className="rows">
          {code.split('').map((_item, i) => (
            <div key={`ABDoorCode_row_${i}`}>
              <div
                className="prevNextButton previous"
                onClick={() => this.updateCurrentCode(i, -1)}
              ></div>
              <div className="row">
                {rowOptions[i].map((j) => {
                  return (
                    <div className="cell" key={`ABDoorCode_row_${i}_cell_${j}`}>
                      <div
                        className={
                          j.toString() === currentCode[i]
                            ? 'text isSelected'
                            : 'text'
                        }
                      >
                        {j.toString()}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div
                className="prevNextButton next"
                onClick={() => this.updateCurrentCode(i, 1)}
              ></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Keypad;
