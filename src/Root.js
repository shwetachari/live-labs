import * as _ from 'lodash';
import * as uuid from 'uuid';
import React from 'react';
import ReactHowler from 'react-howler';
import { AppContext, VIEWS, BACK_NAV_MAP } from './AppContext';
import View from './components/View';
import { nonograms, yellowDoorKey, leftConfigs } from './gameConfigs';
import SoundManager from './components/SoundManager';

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.soundRef = React.createRef();

    const existingState = localStorage.getItem('gameState');
    const stateOverrides = existingState
      ? _.omit(JSON.parse(existingState), [
          'modalContent',
          'setFields',
          'goBack',
          ..._.keys(leftConfigs),
        ])
      : {};

    // console.log({ stateOverrides });

    this.state = {
      // General
      name: props.name,
      view: VIEWS.ROOM_A_FULL,
      activeDialogue: null,
      modalContent: null,
      activeSounds: [],
      triggerSound: this.triggerSound,
      setFields: this.setFields,
      goBack: this.goBack,

      // Lock/puzzle state
      isABDoorLocked: true,
      isPhoneLocked: true,
      isComputerLocked: true,
      isRoomABoxLocked: true,
      ABDoorCode: props.ABDoorCode,
      roomAPhonePasscode: props.roomAPhonePasscode,
      roomAComputerPassword: props.roomAComputerPassword,
      roomAStickyNote: props.roomAStickyNote,
      roomASymbol: props.roomASymbol,
      roomAStep1: props.roomAStep1,
      roomAStep2: props.roomAStep2,
      roomABoxCode: 'autoganzfeld',

      isRoomBBoxLocked: true,
      isRoomBBoxOpen: false,
      roomBLeftScreen: props.roomBLeftScreen,
      roomBRightScreen: props.roomBRightScreen,

      currentTemp: 65,
      morseKey: props.morseKey,

      isDEDoorLocked: true,
      isBlackLightOn: false,
      DEDoorCode: _.map('NEURON', (char) => yellowDoorKey[char]).join(''),
      yellowDoorKey: props.yellowDoorKey,
      blackLightCode: '4961',

      isRoomEBoxLocked: true,
      roomEBooks: props.roomEBooks,

      elementConfigs: props.elementConfigs,
      elementLockConfigs: props.elementLockConfigs,
      displayedPotions: props.displayedPotions,
      displayedPotionData: props.displayedPotionData,
      thermometerUnlockColor: props.thermometerUnlockColor,
      thermometerUnlockTemp: props.thermometerUnlockTemp,

      nonograms: props.nonograms,
      nonogramsSolutionStatus: _.times(props.nonograms.length, () => false),
      exitNonograms: _.map('castorpollux', (char) => nonograms[char]),
      exitTopCode: _.map(
        _.map('castor', (char) => nonograms[char]),
        'code'
      ).join(''),
      exitBottomCode: _.map(
        _.map('pollux', (char) => nonograms[char]),
        'code'
      ).join(''),
      isExitTopLocked: true,
      isExitBottomLocked: true,
      isFinished: false,

      ...stateOverrides,
    };
  }

  timeout = null;

  setFields = (fields) => {
    this.setState(fields);
  };

  componentDidUpdate = (_prevProps, prevState) => {
    // console.log('Updated State:', this.state);
    this.state.view === VIEWS.EXIT
      ? localStorage.setItem('gameState', '')
      : localStorage.setItem('gameState', JSON.stringify(this.state));
    if (prevState.activeDialogue !== this.state.activeDialogue) {
      if (this.timeout) window.clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.timeout = null;
        this.setState({ activeDialogue: null });
      }, 3000);
    }
  };

  goBack = () => {
    const { view: currentView } = this.state;
    this.setState({ view: BACK_NAV_MAP[currentView] });
  };

  triggerSound = (soundFile, volume) => {
    const id = uuid.v4();
    const { activeSounds } = this.state;
    this.setState({
      activeSounds: [...activeSounds, { id, soundFile, volume }],
    });
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <View />
        {this.state.isFinished ? (
          <ReactHowler src={`/sounds/outro.mp3`} html5={true} playing loop />
        ) : (
          <div>
            <ReactHowler
              src={`/sounds/intro_track.mp3`}
              html5={true}
              volume={0.2}
              playing
              loop
            />
            <ReactHowler
              src={`/sounds/soundtrack.wav`}
              html5={true}
              playing
              loop
            />
            <SoundManager />
          </div>
        )}
      </AppContext.Provider>
    );
  }
}

export default Root;
