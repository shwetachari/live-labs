import * as _ from 'lodash';
import React from 'react';
import '../../styles/Nonogram.scss';

class Nonogram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: props.isSolved
        ? props.solution
        : _.times(5, () => _.times(5, () => 0)),
    };
  }

  toggleCell(row, col) {
    const { grid } = this.state;
    const { isSolved } = this.props;
    if (isSolved) return;

    const currentVal = grid[row][col];
    const gridCopy = _.cloneDeep(grid);
    gridCopy[row][col] = currentVal === 1 ? 0 : 1;
    this.setState({ grid: gridCopy });
  }

  componentDidUpdate() {
    const { grid } = this.state;
    const { onMatch, solution, isSolved } = this.props;

    if (!isSolved && _.isEqual(grid, solution)) onMatch();
  }

  render() {
    const { grid } = this.state;
    const { rows, cols, code } = this.props;

    return (
      <div className="nonogram">
        <div className="left">
          <div className="clues rowClues">
            <div className="clue"></div>
            {rows.map((clue, i) => (
              <div key={`row_clue_${i}`} className="clue">
                {clue.map((num, j) => (
                  <div key={`row_clue_${i}_${j}`}>{num}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="right">
          <div className="clues colClues">
            {cols.map((clue, i) => (
              <div key={`col_clue_${i}`} className="clue">
                {clue.map((num, j) => (
                  <div key={`col_clue_${i}_${j}`}>{num}</div>
                ))}
              </div>
            ))}
          </div>
          <div className="grid">
            {grid.map((vals, row) => (
              <div className="row" key={`nonogram_row_${row}`}>
                {vals.map((val, col) => {
                  return (
                    <div
                      className={val ? 'filled cell' : 'empty cell'}
                      key={`nonogram_row_${row}_col_${col}`}
                      onClick={() => this.toggleCell(row, col)}
                    ></div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        {!_.isNil(code) && <div className="nonogramCode">{code}</div>}
      </div>
    );
  }
}

export default Nonogram;
