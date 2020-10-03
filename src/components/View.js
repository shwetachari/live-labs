import React from 'react';
import { AppContext } from '../AppContext';
import { VIEWS } from '../AppContext';
import RoomA from './rooms/A/Room';
import RoomAComputer from './rooms/A/Computer';
import RoomALocker from './rooms/A/Locker';
import RoomALockerUnlocked from './rooms/A/LockerUnlocked';
import RoomADoor from './rooms/A/Door';
import RoomAWall from './rooms/A/Wall';
import RoomB from './rooms/B/Room';
import RoomBLockedBox from './rooms/B/LockedBox';
import RoomBOpenBox from './rooms/B/OpenBox';
import RoomBScreens from './rooms/B/Screens';
import RoomBMonitor1 from './rooms/B/Monitor1';
import RoomBMonitor2 from './rooms/B/Monitor2';
import RoomBMonitor3 from './rooms/B/Monitor3';
import RoomBMonitor4 from './rooms/B/Monitor4';
import RoomC from './rooms/C/Room';
import RoomCBoxes from './rooms/C/Boxes';
import RoomCExit from './rooms/C/Exit';
import RoomCTile1 from './rooms/C/Tile1';
import RoomCTile2 from './rooms/C/Tile2';
import RoomD from './rooms/D/Room';
import RoomDBroken from './rooms/D/Broken';
import RoomDSwitch from './rooms/D/Switch';
import RoomDDoor from './rooms/D/Door';
import RoomE from './rooms/E/Room';
import RoomECabinet from './rooms/E/Cabinet';
import RoomEHood from './rooms/E/Hood';
import RoomEWall from './rooms/E/Wall';
import RoomEWallUnlocked from './rooms/E/WallUnlocked';
import ExitScene from './Exit';

const VIEW_TO_COMPONENT_MAP = {
  [VIEWS.ROOM_A_FULL]: RoomA,
  [VIEWS.ROOM_A_COMPUTER]: RoomAComputer,
  [VIEWS.ROOM_A_LOCKER]: RoomALocker,
  [VIEWS.ROOM_A_LOCKER_UNLOCKED]: RoomALockerUnlocked,
  [VIEWS.ROOM_A_DOOR]: RoomADoor,
  [VIEWS.ROOM_A_WALL]: RoomAWall,

  [VIEWS.ROOM_B_FULL]: RoomB,
  [VIEWS.ROOM_B_LOCKED_BOX]: RoomBLockedBox,
  [VIEWS.ROOM_B_OPEN_BOX]: RoomBOpenBox,
  [VIEWS.ROOM_B_SCREENS]: RoomBScreens,
  [VIEWS.ROOM_B_MONITOR_1]: RoomBMonitor1,
  [VIEWS.ROOM_B_MONITOR_2]: RoomBMonitor2,
  [VIEWS.ROOM_B_MONITOR_3]: RoomBMonitor3,
  [VIEWS.ROOM_B_MONITOR_4]: RoomBMonitor4,

  [VIEWS.ROOM_C_FULL]: RoomC,
  [VIEWS.ROOM_C_BOXES]: RoomCBoxes,
  [VIEWS.ROOM_C_EXIT]: RoomCExit,
  [VIEWS.ROOM_C_TILE_1]: RoomCTile1,
  [VIEWS.ROOM_C_TILE_2]: RoomCTile2,

  [VIEWS.ROOM_D_FULL]: RoomD,
  [VIEWS.ROOM_D_BROKEN]: RoomDBroken,
  [VIEWS.ROOM_D_SWITCH]: RoomDSwitch,
  [VIEWS.ROOM_D_DOOR]: RoomDDoor,

  [VIEWS.ROOM_E_FULL]: RoomE,
  [VIEWS.ROOM_E_CABINET]: RoomECabinet,
  [VIEWS.ROOM_E_HOOD]: RoomEHood,
  [VIEWS.ROOM_E_WALL]: RoomEWall,
  [VIEWS.ROOM_E_WALL_UNLOCKED]: RoomEWallUnlocked,

  [VIEWS.EXIT]: ExitScene,
};

class View extends React.Component {
  static contextType = AppContext;

  componentDidMount = () => {
    const { setFields } = this.context;
    setFields({ activeSounds: [] });
  };

  render() {
    const { view } = this.context;
    const ViewComponent = VIEW_TO_COMPONENT_MAP[view];

    return <ViewComponent />;
  }
}

export default View;
