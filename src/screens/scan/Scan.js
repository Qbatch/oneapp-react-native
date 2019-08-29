import React from 'react';
import { Platform, StyleSheet, Text, View, Image, ScrollView, PermissionsAndroid, Alert, Vibration } from 'react-native';
import { NavBar, Icon, WhiteSpace, Button, TabBar, SearchBar, List, Card, Slider } from 'antd-mobile-rn';
import { RNCamera } from 'react-native-camera';
import { withNavigationFocus } from 'react-navigation';

class Scan extends React.Component {

  onBarCodeRead = (event) => {
    const { navigation } = this.props;

    if (Platform.OS === 'ios') {
      Vibration.vibrate(500, false)
    } else {
      Vibration.vibrate([0, 500], false)
    }
    navigation.navigate('SearchProducts', { barcode: event.data });
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        {
          navigation.isFocused() ?
            <RNCamera
              ref={ref => { this.camera = ref; }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.auto}
              barCodeTypes={[RNCamera.Constants.BarCodeType.ean13]}
              onBarCodeRead={this.onBarCodeRead} >
              {/*<View style={styles.box} />*/}
            </RNCamera> : null
        }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    opacity: 0.9
  },
  box: {
    flex: 0.5,
    width: '96%',
    height: '30%',
    borderColor: '#FAFAFA',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: '70%'
  }
});

export default withNavigationFocus(Scan);
