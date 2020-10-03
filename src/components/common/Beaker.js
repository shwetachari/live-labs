import React from 'react';
import '../../styles/Beaker.scss';

/*
Blue: #52b1e4
Darkest: #176691
Dark: #1E88C1
Light: #9DD3F0
Lightest: #CEE9F7
Bubble: #DDF0F9

Red: #e74d3c
Darkest: #841C10
Dark: #B62616
Light: #F19389
Lightest: #F7C1BB
Bubble: #F9D4CF

Green: rgb(101,201,101)
Darkest: rgb(42,118,42)
Dark: rgb(58,159,57)
Light: rgb(166,224,164)
Lightest: rgb(207,238,208)
Bubble: rgb(221,243,221)
25WhiteMix: rgb(244,251,243)
6Darken: rgb(79,193,77)
*/

class Beaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { color, symbol } = this.props;

    return (
      <div className={`beaker ${color}`}>
        <p className="symbol">{symbol}</p>
        <div>
          <span className="bubble one"></span>
          <span className="bubble two"></span>
          <span className="bubble three"></span>
          <span className="bubble four"></span>
        </div>
      </div>
    );
  }
}

export default Beaker;
