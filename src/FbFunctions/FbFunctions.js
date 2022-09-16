import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';

export const UserInfo = async (myId, setUserInfo) => {
  const user = await firestore().collection('Users').doc(myId).get();
  setUserInfo({value: user.data(), id: user.id});
};

export const imageUpload = async (
  id,
  fileName,
  image,
  cardData,
  setUploading,
  navigation,
) => {
  setUploading(true);
  let reference = storage().ref(`/images/${Date.now()}${fileName}`);
  let task = reference.putFile(image);
  task
    .then(async () => {
      let photoURL = await reference.getDownloadURL();
      cardData.photoURL = photoURL;
      AddCardToFB(id, cardData, setUploading, navigation);
    })
    .catch(e => {
      Alert.alert('', e);
    });
};

export const AddCardToFB = async (id, cardData, setUploading, navigation) => {
  try {
    await firestore()
      .collection('AllCards')
      .doc(id)
      .collection('myCards')
      .add(cardData);
    alert('card Added Succesfully');
    setUploading(false);
    navigation.navigate('Home');
  } catch (error) {
    setUploading(false);
    alert('', error.message);
  }
};

export const AddUser = async (
  email,
  password,
  userData,
  setLoading,
  navigation,
) => {
  try {
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    let {user} = response;
    if (user) {
      firestore()
        .collection('Users')
        .doc(user.uid)
        .set(userData)
        .then(() => {
          console.log('User added!');
        });
      setLoading(false);
      alert('signin succesfull');
      navigation.navigate('Home');
    }
  } catch (error) {
    setLoading(false);
    Alert.alert('message', error.message);
  }
};
