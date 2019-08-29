import React from 'react';
import { Platform, StyleSheet, Text, View, Image, ScrollView, PermissionsAndroid, Alert } from 'react-native';
import { NavBar, Icon, WhiteSpace, Button, TabBar, SearchBar, List, Card } from 'antd-mobile-rn';

export default class BuyList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Buy List</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});
