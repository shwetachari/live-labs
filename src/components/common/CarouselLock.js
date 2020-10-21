import * as _ from 'lodash';
import React from 'react';
import { DraggableCore } from 'react-draggable';
import '../../styles/CarouselLock.css';
import { faUnlock, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Column extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.list || [6, 7, 8, 9, 0, 1, 2, 3, 4, 5],
      marginTop: 0,
      onStep: false,
      number: props.list ? props.list[4] : 0,
      prevOffset: 0,
      disabled: this.props.isOpen || false,
    };
  }

  componentWillReceiveProps(...args) {
    console.log('args', args);
  }

  dragStart = () => {
    return !this.props.isOpen;
  };

  dragStop = () => {
    const { onDragStop = _.noop } = this.props;
    this.setNumber();
    onDragStop();
  };

  setNumber = () => {
    const { checkMatch, id } = this.props;
    if (checkMatch(this.getNumber(), id)) {
      console.log('setting disabled');
      this.setState({ disabled: true });
    }
  };

  listUpdate = (isUp) => {
    isUp ? this.updateUp() : this.updateDown();
    this.setInitialPos();
  };

  updateState(list) {
    this.setState({
      list: list,
      onStep: false,
    });
  }

  updateUp() {
    const { list } = this.state;
    list.unshift(list.pop());
    this.decNumber();
    this.updateState(list);
  }

  updateDown() {
    const { list } = this.state;
    list.push(list.shift());
    this.incNumber();
    this.updateState(list);
  }

  getNumber() {
    return this.state.number;
  }

  incNumber() {
    this.setState((state) => ({
      number: state.number === 9 ? 0 : state.number + 1,
    }));
  }

  decNumber() {
    this.setState((state) => ({
      number: state.number === 0 ? 9 : state.number - 1,
    }));
  }

  moveBack() {
    this.setState({ onStep: false });
    this.setInitialPos();
  }

  dragAction = (e, data) => {
    const { height, isOpen, checkMatch, id } = this.props;
    if (isOpen || this.state.disabled || checkMatch(this.getNumber, id))
      return false;

    const { onStep, prevOffset } = this.state;
    const step = height / 4;
    const offset = data.deltaY;
    const isContinue = prevOffset ? offset === prevOffset : true;
    const isUp = offset > 0;

    if (!(offset % step)) {
      this.setState((state) => {
        const newMargin = isUp
          ? state.marginTop + step
          : state.marginTop - step;
        return {
          marginTop: newMargin,
          onStep: true,
          prevOffset: offset,
        };
      });
    }

    if (isContinue) {
      onStep && this.listUpdate(isUp);
    } else {
      this.moveBack();
    }
  };

  setInitialPos() {
    this.setState({ marginTop: -this.props.height * 1.75 });
  }

  componentDidMount() {
    this.setInitialPos();
    this.setNumber();
  }

  render() {
    const { height, mainClass } = this.props;
    const { list, marginTop } = this.state;
    const cellSize = height / 2;
    const itemStyle = {
      fontSize: cellSize * 0.8 + 'px',
      height: cellSize + 'px',
      display: 'block',
    };
    const dragStyle = {
      height: height + 'px',
      display: 'inline-block',
      overflow: 'hidden',
    };
    const listStyle = {
      marginTop: marginTop + 'px',
      listStyle: 'none',
    };

    return (
      <div className={`${mainClass}-drag`} style={dragStyle}>
        <DraggableCore
          grid={[cellSize, cellSize / 2]}
          onStart={this.dragStart}
          onDrag={this.dragAction}
          onStop={this.dragStop}
        >
          <ul style={listStyle}>
            {list.map((number, index) => (
              <li
                key={`${this.props.namedId}_${this.props.id}_${index}`}
                style={itemStyle}
              >
                {number}
              </li>
            ))}
          </ul>
        </DraggableCore>
      </div>
    );
  }
}

class CarouselLock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checker: props.initial || [],
      opened: props.isOpen || false,
    };
  }

  static defaultProps = {
    code: '01234',
    height: 70,
    onMatch: () => {},
    onUnmount: () => {},
  };

  checkCode = (number, id) => {
    const { code, onMatch } = this.props;
    const codeNumbers = [...code].map((number) => +number);
    let match = false;
    this.setState(
      (state) => {
        state.checker[id] = number;
        return { checker: state.checker };
      },
      () => {
        match =
          codeNumbers.length === this.state.checker.length &&
          codeNumbers.every((el, i) => el === this.state.checker[i]);
        if (match) {
          this.setState({ opened: true });
          onMatch();
        }
      }
    );
    return match;
  };

  componentDidUpdate() {
    const { checker } = this.state;
    const { onUpdate = _.noop } = this.props;
    onUpdate(checker);
  }

  render() {
    const { code, onMatch, height, ...props } = this.props;
    const { opened, checker } = this.state;

    const mainClass = 'carouselLock';

    return (
      <div className={mainClass}>
        <div className={`${mainClass}-open`} style={{ position: 'absolute' }}>
          {opened ? (
            <FontAwesomeIcon icon={faUnlock} className="green" />
          ) : (
            <FontAwesomeIcon icon={faLock} className="red" />
          )}
        </div>
        <div
          className={`${mainClass}-container`}
          style={{ overflow: 'hidden', height: height }}
        >
          {[...code].map((v, i) => {
            const initial = checker[i];
            const list = initial
              ? [
                  ..._.times(5, (j) => {
                    const val = initial - (4 - j);
                    return val < 0 ? val + 10 : val;
                  }),
                  ..._.times(5, (j) => {
                    const val = initial + j + 1;
                    return val > 9 ? val - 10 : val;
                  }),
                ]
              : null;
            return (
              <Column
                key={`${this.props.namedId}_column_${i}`}
                id={i}
                namedId={this.props.namedId}
                checkMatch={this.checkCode}
                isOpen={opened}
                height={height}
                mainClass={mainClass}
                list={list}
                {...props}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default CarouselLock;
