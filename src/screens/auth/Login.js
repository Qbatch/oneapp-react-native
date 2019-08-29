import React from 'react';
import { View, ScrollView } from 'react-native';
import { List, InputItem, Button, WhiteSpace } from 'antd-mobile-rn';
import Meteor from 'react-native-meteor';

export default class Signin extends React.Component {
  state = {
    username: '',
    password: ''
  }

  handleSubmit = () => {
    console.log('handle submit called');
    const { username, password } = this.state;
    console.log({ username, password });

    Meteor.loginWithPassword(username, password, (error, result) => {
      if (!error) {
        console.log('success');
        this.props.navigation.navigate('App');
      }
    });
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <List renderHeader="Sign In">
          <InputItem
            placeholder="Enter Username"
            autoCapitalize="none"
            autoCorrect={false}
            onChange={username => this.setState({ username })}
            autoFocus >
          </InputItem>
          <InputItem
            type="password"
            placeholder="Enter Password"
            autoCapitalize="none"
            autoCorrect={false}
            onChange={(password) => this.setState({ password })}
            >
          </InputItem>
        </List>
        <WhiteSpace size="lg" />
        <Button onClick={() => this.handleSubmit()}>Login</Button>
      </ScrollView>
    );
  }
}
