import React from 'react';
import { AppContext } from '../AppContext';
import '../styles/HintModal.scss';

class HintModal extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      hint: null,
      quitterHint: null,
    };
  }

  revealHint = () => {
    const { getHint } = this.context;
    this.setState({ hint: getHint() });
  };

  revealQuitterHint = () => {
    const { getHint } = this.context;
    const res = window.confirm(
      `Are you absolutely sure you want the step-by-step solution?`
    );
    if (res) this.setState({ quitterHint: getHint(true) });
  };

  render() {
    const { hint, quitterHint } = this.state;

    return (
      <div className="hintModal">
        <p>
          The name of the game is <strong>communication</strong>. Sharing
          screens can be incredibly useful if you and your twin are playing the
          game over video chat — just make sure at least one person has their
          audio on. For extra challenge (and fun), use voice-only communication.
        </p>
        <p>
          <strong>When in doubt, click things!</strong>
        </p>
        <p>
          For the best gaming experience, try not to rely on hints (as much as
          you are able). Note: Hints will disappear once you close them in case
          you open a hint and change your mind. You can always re-reveal the
          hint if needed.
        </p>
        {!hint && (
          <div style={{ display: 'block', width: '100%', textAlign: 'center' }}>
            <div className="button" onClick={this.revealHint}>
              Get Hint
            </div>
          </div>
        )}
        {hint && <p>{hint}</p>}
        {hint && !quitterHint && (
          <div style={{ display: 'block', width: '100%', textAlign: 'center' }}>
            <div className="button" onClick={this.revealQuitterHint}>
              Still stuck?
            </div>
          </div>
        )}
        {quitterHint && <p>{quitterHint}</p>}
      </div>
    );
  }
}

export default HintModal;
