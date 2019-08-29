import React from 'react';
import Meteor from 'react-native-meteor';
import { Platform, StyleSheet, Text, View, Image, ScrollView, PermissionsAndroid, Alert } from 'react-native';
import { NavBar, Icon, WhiteSpace, Button, TabBar, SearchBar, List, Card } from 'antd-mobile-rn';

const Item = List.Item;

export default class Settings extends React.Component {

  handleLogout = () => {
    Meteor.logout();
    this.props.navigation.navigate('Auth');
  }

  render() {
    return (
      <View style={styles.container}>
        <List>
          <Item onClick={() => this.handleLogout()}>
              Logout
          </Item>
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});
