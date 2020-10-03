import * as _ from 'lodash';
import React from 'react';
import '../../styles/Thermostat.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

class Thermostat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTemp: props.isLocked ? props.targetTemp : props.startingTemp,
    };
  }

  min = 30;
  max = 100;
  halfway = 30 + (100 - 30) / 2;

  changeTemp = (operator) => {
    const { isLocked, onChange = _.noop } = this.props;
    if (isLocked) return;

    let update = this.state.currentTemp + operator;
    update = update < this.min ? this.min : update;
    update = update > this.max ? this.max : update;
    this.setState({
      currentTemp: update,
    });
    onChange();
  };

  getShadowStyles = () => {
    const { currentTemp } = this.state;
    const half = this.min + (this.max - this.min) / 2;
    const amountOverHalf = currentTemp - half;
    const degrees = (160 * amountOverHalf) / ((this.max - this.min) / 2);
    return {
      animation: 'none',
      transform: `translate(-50%, -50%) rotate(${degrees}deg)`,
      webkitTransform: `translate(-50%, -50%) rotate(${degrees}deg)`,
    };
  };

  getFill1Styles = () => {
    const { currentTemp } = this.state;
    const half = this.min + (this.max - this.min) / 2;
    const amountOverHalf = currentTemp - half;
    const degrees =
      amountOverHalf <= 0
        ? 0
        : (160 * amountOverHalf) / ((this.max - this.min) / 2);
    return {
      animation: 'none',
      transformOrigin: 'center',
      transform: `rotate(${degrees}deg)`,
    };
  };

  getFill2Styles = () => {
    const { currentTemp } = this.state;
    const half = this.min + (this.max - this.min) / 2;
    const amountOverHalf = currentTemp - half;
    const degrees =
      amountOverHalf >= 0
        ? 0
        : (160 * amountOverHalf) / ((this.max - this.min) / 2);
    return {
      animation: 'none',
      transformOrigin: 'center',
      transform: `rotate(${degrees - 180}deg)`,
    };
  };

  componentDidUpdate = () => {
    const { currentTemp } = this.state;
    const { targetTemp, onMatch, onIncorrect } = this.props;

    if (currentTemp === targetTemp) return onMatch();

    onIncorrect();
  };

  componentWillUnmount = () => {
    const { currentTemp } = this.state;
    const { onExit = _.noope } = this.props;
    onExit(currentTemp);
  };

  render() {
    const { currentTemp } = this.state;

    return (
      <div className="thermostat">
        <div className="bar">
          <div className="inner_bar"></div>
          <div className="hold left">
            <div className="fill fill1" style={this.getFill1Styles()}></div>
          </div>
          <div className="hold right">
            <div className="fill fill2" style={this.getFill2Styles()}></div>
          </div>
          <span>Heating</span>
        </div>
        <div className="shadow" style={this.getShadowStyles()}>
          <div className="shadow-cube"></div>
        </div>
        <div className="number" style={this.getShadowStyles()}>
          <span className="ext">{currentTemp}</span>
        </div>
        <div className="center">
          <span className="arrow minus" onMouseDown={() => this.changeTemp(-1)}>
            <FontAwesomeIcon icon={faChevronLeft} className="icon" />
          </span>
          <span className="arrow plus" onMouseDown={() => this.changeTemp(1)}>
            <FontAwesomeIcon icon={faChevronRight} className="icon" />
          </span>
          <div className="small">
            <span className="heat">{currentTemp}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Thermostat;
