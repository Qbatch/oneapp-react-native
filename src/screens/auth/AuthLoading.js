import React from 'react';
import Meteor, { withTracker } from 'react-native-meteor';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage
} from 'react-native';

export default class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this.isLoggedIn();
  }

  isLoggedIn = async () => {
    const token = await AsyncStorage.getItem('reactnativemeteor_usertoken');
    console.log({ token });
    this.props.navigation.navigate(token ? 'App' : 'Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});
