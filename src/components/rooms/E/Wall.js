import * as _ from 'lodash';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import { AppContext, VIEWS } from '../../../AppContext';
import ClickableRoom from '../../common/ClickableRoom';
import CarouselLock from '../../common/CarouselLock';
import roomEWall from '../../../images/rooms/E/wall.png';
import periodicTable from '../../../images/rooms/E/periodic_table.jpg';
import '../../../styles/RoomE.css';

class RoomEWall extends React.Component {
  static contextType = AppContext;

  showPeriodicTable = () => {
    const { setFields } = this.context;
    const modalContent = (
      <img src={periodicTable} className="periodicTable" alt="Periodic Table" />
    );
    setFields({ modalContent });
  };

  setConfigField = (i, fieldName, value) => {
    const { setFields, elementLockConfigs } = this.context;
    const lockConfigsCopy = _.cloneDeep(elementLockConfigs);
    lockConfigsCopy[i][fieldName] = value;

    setFields({ elementLockConfigs: lockConfigsCopy });
  };

  goToUnlockedBox = () => {
    const { isRoomEBoxLocked, setFields, triggerSound } = this.context;

    if (!isRoomEBoxLocked) {
      triggerSound('open_chest');
      return setFields({ view: VIEWS.ROOM_E_WALL_UNLOCKED });
    }

    setFields({ activeDialogue: `Surprise, surprise. The box is locked.` });
  };

  getHint = () => {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          fontSize: '40px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          opacity: 0.9,
        }}
      >
        <div
          style={{
            fontFamily: `'Share Tech Mono', sans-serif`,
            paddingRight: '10px',
          }}
        >
          SUM
        </div>
        <FontAwesomeIcon icon={faBalanceScale} />
      </div>
    );
  };

  attemptUnlock = () => {
    const { setFields, elementLockConfigs } = this.context;

    if (_.some(elementLockConfigs, 'isLocked')) return;

    setFields({
      isRoomEBoxLocked: false,
      activeDialogue: `Yes! Let's hope I don't have to deal with more math and chemistry to get out of here.`,
    });
  };

  showLocks = () => {
    const {
      setFields,
      triggerSound,
      elementLockConfigs,
      isRoomEBoxLocked,
    } = this.context;

    if (!isRoomEBoxLocked) {
      return setFields({ activeDialogue: `I've already unlocked this box.` });
    }

    const modalContent = (
      <div className="roomECarousels">
        {elementLockConfigs.map((config, i) => (
          <div key={`roomECarousel_${i}`}>
            <img src={config.icon} alt="Icon" />
            <CarouselLock
              key={`room_e_carousel_${i}`}
              namedId={`room_e_carousel_${i}`}
              isOpen={!config.isLocked}
              code={config.code}
              initial={config.lastGuess}
              onDragStop={() => triggerSound('click')}
              onMatch={() => {
                this.setConfigField(i, 'isLocked', false);
                this.attemptUnlock();
                triggerSound('unlock');
              }}
              onUpdate={(val) => this.setConfigField(i, 'lastGuess', val)}
            />
          </div>
        ))}
        <div
          style={{
            position: 'fixed',
            fontSize: 8,
            color: 'gray',
            bottom: 5,
            right: 5,
          }}
        >
          Icons made by{' '}
          <a
            style={{ color: 'gray', textDecoration: 'none' }}
            href="https://www.flaticon.com/authors/freepik"
            title="Freepik"
          >
            Freepik
          </a>{' '}
          from{' '}
          <a
            style={{ color: 'gray', textDecoration: 'none' }}
            href="https://www.flaticon.com/"
            title="Flaticon"
          >
            {' '}
            www.flaticon.com
          </a>
        </div>
      </div>
    );
    setFields({ modalContent });
  };

  render() {
    const { setFields } = this.context;

    return (
      <ClickableRoom
        background={roomEWall}
        interactiveElementConfigs={[
          {
            boundingBox: [
              [27.5, 1],
              [72.2, 46.7],
            ],
            onClick: this.showPeriodicTable,
          },
          {
            boundingBox: [
              [30.3, 65.2],
              [69.1, 98],
            ],
            onClick: this.goToUnlockedBox,
          },
          {
            boundingBox: [
              [45.2, 71.1],
              [54.4, 93.8],
            ],
            onClick: this.showLocks,
          },
          {
            boundingBox: [
              [58, 80],
              [67, 85],
            ],
            element: this.getHint(),
            onClick: () =>
              setFields({ activeDialogue: `What could this mean?` }),
          },
        ]}
      />
    );
  }
}

export default RoomEWall;
