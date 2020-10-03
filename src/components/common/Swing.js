import React from 'react';
import '../../styles/Swing.css';

class Swing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { className: 'swing' };
  }

  updateClassName = () => {
    const classes = this.state.className.split(' ');

    if (classes.length > 1) classes.pop();
    else classes.push('open');

    this.setState({
      className: classes.join(' '),
    });
  };

  render() {
    const { children } = this.props;
    const { className } = this.state;

    return (
      <div className={className} onClick={this.updateClassName}>
        {children}
      </div>
    );
  }
}

export default Swing;
