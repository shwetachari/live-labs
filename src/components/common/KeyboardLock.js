import * as _ from 'lodash';
import React from 'react';
import '../../styles/KeyboardLock.scss';

class KeyboardLock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentText: '' };
  }

  row1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  row2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  row3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

  appendText = (char) => {
    const { currentText } = this.state;
    const { target, onKeyClick } = this.props;
    const updatedText = currentText + char;
    if (currentText !== target) {
      this.setState({ currentText: updatedText });
      onKeyClick();
    }
  };

  deleteText = () => {
    const { currentText } = this.state;
    const { target, onKeyClick } = this.props;
    if (currentText !== target) {
      this.setState({
        currentText: currentText.slice(0, currentText.length - 1),
      });
      onKeyClick();
    }
  };

  componentDidUpdate = () => {
    const { target, onMatch } = this.props;
    const { currentText } = this.state;
    if (currentText === target) onMatch();
  };

  render() {
    const { currentText } = this.state;
    const { target } = this.props;
    const unlocked = currentText === target;

    return (
      <div className="keyboardLock">
        <div className={unlocked ? 'text unlocked' : 'text'}>
          <span>{_.toUpper(currentText)}</span>
        </div>
        <div className="rows">
          {[this.row1, this.row2, this.row3].map((row, i) => (
            <div className="row" key={`keyboard_row_${i}`}>
              {row.map((char) => (
                <div
                  key={`keyboard_${char}`}
                  className="key"
                  onClick={() => this.appendText(char)}
                >
                  {_.toUpper(char)}
                </div>
              ))}
            </div>
          ))}
          <div className="row delete" onClick={this.deleteText}>
            Delete
          </div>
        </div>
      </div>
    );
  }
}

export default KeyboardLock;
