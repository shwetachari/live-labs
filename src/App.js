import * as _ from 'lodash';
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  withRouter,
  Redirect,
  // useHistory,
} from 'react-router-dom';
import Root from './Root';
import * as images from './images';

import { leftConfigs, rightConfigs } from './gameConfigs';

class App extends React.Component {
  componentDidMount() {
    const { history } = this.props;

    const unblock = history.block((location, action) => {
      if (window.confirm('Are you sure you want to leave this page?'))
        unblock();
    });

    _.each(images, (image) => {
      new Image().src = image;
    });
  }

  render() {
    const name = new URLSearchParams(window.location.search).get('name');

    const leftProps = {
      name: name || 'Shruti',
      ...leftConfigs,
    };

    const rightProps = {
      name: name || 'Sneha',
      ...rightConfigs,
    };

    return (
      <Switch>
        <Route exact path="/moon">
          <Root {...leftProps} />
        </Route>
        <Route exact path="/sun">
          <Root {...rightProps} />
        </Route>
      </Switch>
    );
  }
}

const AppWithRouter = withRouter(App);
function AppContainer() {
  return (
    <BrowserRouter>
      <Route path="/" component={AppWithRouter} />
    </BrowserRouter>
  );
}

export default AppContainer;
