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
      getHint: this.getHint,

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

  getHint = (isQuitter = false) => {
    const {
      isComputerLocked,
      isABDoorLocked,

      isBlackLightOn,

      isPhoneLocked,
      isDEDoorLocked,

      isRoomBBoxLocked,
      isRoomBBoxOpen,

      isRoomABoxLocked,

      isRoomEBoxLocked,

      isExitTopLocked,
      isExitBottomLocked,
    } = this.state;

    if (isComputerLocked)
      return isQuitter
        ? `There is a symbol behind the picture on the wall. Match that symbol to the clues on the scraps of paper in your and your twin's rooms. The bolded letters on these pieces of paper spell out words. Use the ordering of the "steps" on these pieces of paper to piece together the password to the computer.`
        : 'Have you thoroughly searched the room? Pay attention to the symbols, words, and numbers that you see.';

    if (isABDoorLocked)
      return isQuitter
        ? `There's an electronic door lock diagram open on the computer. Use the four numbers displayed on the bottom left side of that diagram to open the door.`
        : 'You should have seen an electronic door lock diagram somewhere.';

    if (!isBlackLightOn)
      return isQuitter
        ? `There is a purple light in the operation room and another purple light in the room with the broken glass. Underneath the light in the operation room is a speaker that plays a message in morse code. You can find half of a morse code key on top of the boxes in the next room. Combine your key with your twin's key to decode the four numbers in the message. Use those four numbers to unlock the keypad next to the purple light in the room with the broken glass.`
        : `Make sure your sound is on. Have you tried looking around the purple lights? Have you investigated the pair of boxes lying on the cart?`;

    if (isPhoneLocked)
      return isQuitter
        ? 'One twin should see a set of symbols of different sizes. These symbols match the symbols used in the picture of a butterfly on the wall in the room with the broken glass. Count the number of times each symbol appears in the picture. The other twin should see a clue that determines the ordering of these numbers based on the size they were displayed on the sticky note. Use the ordered numbers to unlock the phone.'
        : 'Take a look at the sticky note under the phone in the bedroom. What does your twin see on the sticky note?';

    if (isDEDoorLocked)
      return isQuitter
        ? `The voicemail on the phone says the word "neuron" opens the room with the yellow doors. In the tiled hallway, there is a key that translates those letters into numbers. Combine your key with your twin's key to translate the full word. Use this numerical code to open the yellow doors in the room with the broken glass.`
        : 'Make sure your sound is on. Have you checked the voicemails on the phone in the bedroom? Check each room thoroughly for any other symbols that match the mentioned doors.';

    if (isRoomBBoxLocked && !isRoomBBoxOpen)
      return isQuitter
        ? `Looks like you've correctly set the thermostat temperature! Try opening the box on the table in the operation room.`
        : `Have you tried opening all boxes and doors that you've solved for?`;

    if (isRoomBBoxLocked)
      return isQuitter
        ? 'One twin should see the a red flask symbol, and the other should see a blue flask symbol.'
        : 'Have you seen anything that resembles the symbols on the locked box in the operation room? Pay attention to the colors.';

    if (isRoomABoxLocked)
      return isQuitter
        ? `There's a locked box in a locker in the bedroom. On top of the box is a brown book titled the "Progression of Time." There is a bookshelf in a cabinet in the chemistry lab. The brown books have symbols on them. Each twin should see half of the key to decipher these symbols on the screens in the top left of the operation room. Keep in mind that the books are rotated, so the symbols are also rotated 90 degrees. Order the books by year, then use the translation of symbols to numbers to open the box in the bedroom.`
        : `Are there any locked doors or boxes in earlier rooms that you skipped over? Check back to see if any of the new clues you're finding might help. Pay attention to the color, title, and physical orientation of these clues.`;

    if (isRoomEBoxLocked)
      return isQuitter
        ? `The four monitors in the operation room have lists of elements on them. Use the periodic table in the chemistry lab to match each list to the corresponding symbol on you or your twin's locked box in the chemistry lab. Each monitor has buttons next to it that are lit, off, or disabled. Take the sum of the weights of the elements that match only the lit buttons. For example, if only the first and third buttons are lit, sum the weights of only the first and third elements on the adjacent list. For each monitor, use the sum to open the carousel lock adjacent to the list's matching symbol on the locked box in the chemistry lab.`
        : 'Investigate all locations that seem connected to the periodic table of elements. Pay attention to any patterns with symbols and buttons.';

    if (isExitTopLocked || isExitBottomLocked)
      return isQuitter
        ? `Match the symbols you see on the exit door to the nonogram puzzles you've been seeing everywhere. Between you and your twin, there should be one per unique letter. You might want to check the nonograms at these locations: inside the locked box on a table in the operation room, inside the locked box in a locker in the bedroom, on one of the tiles in the hallway that the exit door is in, inside the locked box in the chemistry lab, and on the last page of the book behind the broken glass when the blacklight is on.`
        : `Almost there! Have you searched all rooms thoroughly for nonograms?`;
  };

  render() {
    const { isFinished } = this.state;
    return (
      <AppContext.Provider value={this.state}>
        <View />
        <ReactHowler
          src={`/sounds/outro.mp3`}
          html5={true}
          playing={isFinished}
          loop
        />
        <div>
          <ReactHowler
            src={`/sounds/intro_track.mp3`}
            html5={true}
            volume={0.2}
            playing={!isFinished}
            loop
          />
          <ReactHowler
            src={`/sounds/soundtrack.wav`}
            html5={true}
            playing={!isFinished}
            loop
          />
          <SoundManager />
        </div>
        )
      </AppContext.Provider>
    );
  }
}

export default Root;
