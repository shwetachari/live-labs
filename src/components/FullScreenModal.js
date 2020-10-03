import React from 'react';
import { AppContext } from '../AppContext';
import '../styles/FullScreenModal.css';

class FullScreenModal extends React.Component {
  static contextType = AppContext;

  render() {
    const { offsetFromRight } = this.props;
    const { modalContent, setFields } = this.context;

    return (
      <div className="fullScreenModal" onClick={this.updateClassName}>
        <div
          className="close"
          style={{ right: offsetFromRight }}
          onClick={() => setFields({ modalContent: null })}
        >
          X
        </div>
        <div className="contentWrapper">
          <div className="content">{modalContent}</div>
        </div>
      </div>
    );
  }
}

export default FullScreenModal;
