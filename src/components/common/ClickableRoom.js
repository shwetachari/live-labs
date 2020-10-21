import React from 'react';
import { AppContext, BACK_NAV_MAP } from '../../AppContext';
import FullScreenModal from '../FullScreenModal';
import '../../styles/Room.css';

class ClickableRoom extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      backgroundDimensions: { width: 0, height: 0 },
      windowDimensions: { width: 0, height: 0 },
    };
  }

  componentDidMount() {
    // this.getBackgroundStyles();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  moveTo = (view) => {
    const { setFields } = this.context;
    setFields({ view });
  };

  updateDimensions = ({ target }) => {
    const { backgroundDimensions } = this.state;

    const windowDimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const widthToHeightRatio =
      target.offsetWidth && target.offsetHeight
        ? target.offsetWidth / target.offsetHeight
        : backgroundDimensions.width / backgroundDimensions.height;

    const minWidth = 600;
    const minHeight = (1 / widthToHeightRatio) * minWidth;
    const backgroundWidth = Math.min(
      windowDimensions.width,
      widthToHeightRatio * windowDimensions.height
    );
    const backgroundHeight = Math.min(
      windowDimensions.height,
      (1 / widthToHeightRatio) * windowDimensions.width
    );

    this.setState({
      backgroundDimensions: {
        width: Math.max(backgroundWidth, minWidth),
        height: Math.max(backgroundHeight, minHeight),
      },
      windowDimensions,
    });
  };

  getBackgroundStyles = () => {
    const { backgroundDimensions } = this.state;

    if (!backgroundDimensions.width || !backgroundDimensions.height) return {};

    return {
      width: backgroundDimensions.width,
      height: backgroundDimensions.height,
    };
  };

  getOffset = () => {
    const { backgroundDimensions, windowDimensions } = this.state;
    const topMaxOffset = 100;
    const topDynamicOffset =
      (windowDimensions.height - backgroundDimensions.height) / 2;
    const leftDynamicOffset =
      (windowDimensions.width - backgroundDimensions.width) / 2;
    return {
      top: Math.min(topMaxOffset, topDynamicOffset),
      left: leftDynamicOffset,
    };
  };

  /*
    Interactive element configs:
    [
      {
        boundingBox?: [[x, y],[x, y]], // percentage relative to image
        onClick: () => {},
        rotateDegrees: number,
        element?: Element
      }
    ]
  */
  getInteractiveElement = (interactiveElementConfig, i) => {
    const { backgroundDimensions } = this.state;
    const { top: offsetFromTop, left: offsetFromLeft } = this.getOffset();
    const boundingBox = interactiveElementConfig.boundingBox || [
      [0, 0],
      [0, 0],
    ];

    const calculatedPositionTop =
      (boundingBox[0][1] / 100) * backgroundDimensions.height + offsetFromTop;
    const calculatedPositionLeft =
      (boundingBox[0][0] / 100) * backgroundDimensions.width + offsetFromLeft;

    const calculatedWidth = Math.abs(
      boundingBox
        .map(([x]) => (x / 100) * backgroundDimensions.width)
        .reduce((a, b) => a - b)
    );
    const calculatedHeight = Math.abs(
      boundingBox
        .map(([, y]) => (y / 100) * backgroundDimensions.height)
        .reduce((a, b) => a - b)
    );

    const calculatedTransform = interactiveElementConfig.rotateDegrees
      ? `rotate(${interactiveElementConfig.rotateDegrees}deg)`
      : null;

    return (
      <div
        key={`Interactive-${i}`}
        className="interactive"
        onClick={interactiveElementConfig.onClick}
        style={{
          // border: '1px solid blue', // temp
          position: 'fixed',
          display: 'block',
          zIndex: 10,
          top: calculatedPositionTop,
          left: calculatedPositionLeft,
          width: calculatedWidth,
          height: calculatedHeight,
          transform: calculatedTransform,
        }}
      >
        {interactiveElementConfig.element}
      </div>
    );
  };

  getDialogue = () => {
    const { activeDialogue } = this.context;
    // const { backgroundDimensions } = this.state;
    // const { top: offsetFromTop } = this.getOffset();

    return (
      <div
        className="dialogue"
        style={{
          padding: 15,
          fontSize: 25,
          // top: backgroundDimensions.height / 4 - 55 + offsetFromTop
          top: '18%',
          position: 'fixed',
          zIndex: activeDialogue ? 1000 : -1000,
          transition: 'all 0.2s ease-in-out',
          opacity: activeDialogue ? 1 : 0,
        }}
      >
        {activeDialogue}
      </div>
    );
  };

  getModal = () => {
    const { backgroundDimensions } = this.state;
    const { top: offsetFromTop, left: offsetFromLeft } = this.getOffset();

    return (
      <div
        style={{
          position: 'absolute',
          top: offsetFromTop,
          left: offsetFromLeft,
          width: backgroundDimensions.width,
          height: backgroundDimensions.height,
        }}
      >
        <FullScreenModal offsetFromRight={offsetFromLeft} />
      </div>
    );
  };

  render() {
    const { background, interactiveElementConfigs = [] } = this.props;
    const { backgroundDimensions } = this.state;
    const { view, goBack, modalContent } = this.context;
    const { top: offsetFromTop, left: offsetFromLeft } = this.getOffset();
    const backgroundStyles = this.getBackgroundStyles();

    return (
      <div
        className="clickableRoom"
        style={{ marginTop: offsetFromTop, marginLeft: offsetFromLeft }}
      >
        <img
          className="background"
          onLoad={this.updateDimensions}
          style={backgroundStyles}
          src={background}
          alt={`Room ${background}`}
        />
        <div
          style={{
            width: backgroundDimensions.width,
            height: backgroundDimensions.height,
          }}
        >
          {interactiveElementConfigs.map((config, i) =>
            this.getInteractiveElement(config, i)
          )}
          {this.getDialogue()}
          {BACK_NAV_MAP[view] && !modalContent && (
            <div
              className="back"
              onClick={goBack}
              style={{
                height: 50,
                top: backgroundDimensions.height - 50 + offsetFromTop,
                zIndex: 200,
              }}
            >
              &#9660;
            </div>
          )}
          {modalContent && this.getModal()}
        </div>
      </div>
    );
  }
}

export default ClickableRoom;
