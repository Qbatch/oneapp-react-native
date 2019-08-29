import React from 'react';
import Meteor from 'react-native-meteor';

import AppNavigator from './navigation/AppNavigator';

const SERVER_URL = 'ws://localhost:4000/websocket';
const SERVER_URL = 'ws://oneapp.minmaxind.com/websocket';

export default class App extends React.Component {
  constructor() {
    super();
    Meteor.connect(SERVER_URL);
  }

  render() {
    return (<AppNavigator />);
  }
}
