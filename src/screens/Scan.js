import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {BackComp, ButtonComp} from '../components/Reuse';
import QRCode from 'react-native-qrcode-svg';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import RNFS from 'react-native-fs';
import {useNavigation} from '@react-navigation/native';

const imgLInk =
  'https://joyofandroid.com/wp-content/uploads/2019/05/zerones-business-card-maker-and-creator-e1559143425671.png';

const Scan = () => {
  const [productQRref, setProductQRref] = useState();
  const navigation = useNavigation();

  const saveQrToDisk = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    if (productQRref) {
      productQRref.toDataURL(data => {
        let filePath = RNFS.CachesDirectoryPath + `/something.png`;
        RNFS.writeFile(filePath, data, 'base64')
          .then(success => {
            return CameraRoll.save(filePath, 'photo');
          })
          .then(() => {
            ToastAndroid.show('QRCode saved to gallery', ToastAndroid.LONG);
          });
      });
    }
  };

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  const saveQrCode = () => {
    navigation.navigate('QrScaner');
  };

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <BackComp text="My QR code" />
      <View style={styles.qrCodeWrapper}>
        <QRCode
          value="hello from jahidul"
          size={250}
          logo={{uri: imgLInk}}
          logoSize={30}
          logoBackgroundColor="transparent"
          getRef={e => setProductQRref(e)}
        />
      </View>

      <View style={styles.btnWrapper}>
        <ButtonComp
          text="Scan Qr Code"
          onClick={saveQrCode}
          btnExtraStyle={styles.btnExtraStyle}
          btnTextExtraStyle={styles.btnTextExtraStyle}
        />
        <ButtonComp
          text="Save Qr Code"
          onClick={saveQrToDisk}
          btnExtraStyle={styles.btnExtraStyle}
          btnTextExtraStyle={styles.btnTextExtraStyle}
        />
      </View>
    </ScrollView>
  );
};

export default Scan;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 15,
  },
  qrCodeWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 30,
  },
  btnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btnExtraStyle: {
    width: '35%',
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  btnTextExtraStyle: {
    color: '#000',
    fontSize: 15,
  },
});
