import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {BackComp} from '../components/Reuse';

const QrScaner = () => {
  const onSuccess = e => {
    Linking.openURL(e.data)
      .then(val => console.log(val))
      .catch(err => console.error('An error occured', err));
  };

  const FlashON = () => {
    RNCamera.Constants.FlashMode.torch;
  };
  return (
    <View style={styles.root}>
      <BackComp text="QrScan" />
      <QRCodeScanner
        containerStyle={styles.containerStyle}
        topViewStyle={{backgroundColor: 'red', width: 0, height: 0}}
        onRead={onSuccess}
        showMarker={true}
        cameraStyle={{width: '100%', height: 150}}
      />
    </View>
  );
};

export default QrScaner;

const styles = StyleSheet.create({
  root: {flex: 1, paddingHorizontal: 15},
  //   containerStyle: {
  //     marginTop: -80,
  //   },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,

    backgroundColor: 'red',
  },
});
