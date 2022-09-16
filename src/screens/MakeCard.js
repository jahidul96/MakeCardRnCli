import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {BackComp, ButtonComp, Input} from '../components/Reuse';
import {Picker} from '@react-native-picker/picker';
import {COLORS} from '../Color/Coolor';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {AddCardToFB, imageUpload} from '../FbFunctions/FbFunctions';
import {useNavigation} from '@react-navigation/native';

const MakeCard = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [number, setNumber] = useState('');
  const [adderss, setAddress] = useState('');
  const [buisnessType, setBuisnessType] = useState('Personal');
  const [image, setImage] = useState();
  const [uploading, setUploading] = useState(false);
  const navigation = useNavigation();

  const myUid = auth()?.currentUser.uid;

  const submitDetails = async () => {
    setUploading(true);
    if (
      !name ||
      !email ||
      !position ||
      !number ||
      !adderss ||
      !buisnessType ||
      !image
    ) {
      alert('fill all the filed');
      setUploading(false);
      return;
    }

    let cardData = {
      name,
      email,
      position,
      number,
      adderss,
      buisnessType,
      createAt: Date.now(),
    };
    imageUpload(
      myUid,
      image.assets[0].fileName,
      image.assets[0].uri,
      cardData,
      setUploading,
      navigation,
    );
  };

  const options = {
    maxWidth: 2000,
    maxHeight: 2000,

    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const pickImage = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setImage(response);
      }
    });
  };
  return (
    <View style={styles.root}>
      <BackComp text="Makecard" />
      <ScrollView
        contentContainerStyle={{marginVertical: 10, paddingBottom: 30}}>
        <Input placeholder="Name" setValue={setName} />
        <Input placeholder="Email" setValue={setEmail} />
        <Input placeholder="Position" setValue={setPosition} />
        <View style={styles.PickerContainerStyle}>
          <Picker
            style={styles.pickerStyle}
            selectedValue={buisnessType}
            onValueChange={(itemValue, itemIndex) =>
              setBuisnessType(itemValue)
            }>
            <Picker.Item label="Personal" value="Personal" />
            <Picker.Item label="Buisness" value="Buisness" />
          </Picker>
        </View>
        <Input placeholder="Number" setValue={setNumber} />
        <Input placeholder="Address" setValue={setAddress} />
        <View style={styles.photoContainer}>
          {image?.assets[0]?.uri && (
            <Image
              source={{uri: image.assets[0].uri}}
              style={styles.imgStyle}
            />
          )}
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.text}>Add photo</Text>
          </TouchableOpacity>
        </View>

        <ButtonComp
          text={uploading ? 'Submiting...' : 'Submit'}
          onClick={submitDetails}
        />
      </ScrollView>
    </View>
  );
};

export default MakeCard;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 15,
  },
  PickerContainerStyle: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: COLORS.darkGray,
    borderRadius: 6,
    justifyContent: 'center',
    marginBottom: 10,
  },
  pickerStyle: {
    marginLeft: -5,
  },
  photoContainer: {
    width: '100%',
    height: 80,
    borderColor: COLORS.darkGray,
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.primary,
  },
  imgStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    left: 30,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
});
