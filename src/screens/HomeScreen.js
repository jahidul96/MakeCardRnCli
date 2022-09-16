import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
  Image,
  Share,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {COLORS} from '../Color/Coolor';
import {UserInfo} from '../FbFunctions/FbFunctions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ButtonComp} from '../components/Reuse';
import firestore from '@react-native-firebase/firestore';

const imgUrl =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC74dA9MMnkXPQ7Qb5orQ9UfX7HsBxo6FzJCOcDt3ez5i5g586Phb4yvGSAZBIHH6ZVGU&usqp=CAU';

const PlusIconImg =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBDKz46gmA1A0T17_AUgYixL_k58evAcViyMgvsVTVRZpDXBDe03CfhtXICujFFNascd0&usqp=CAU';

const qrImg =
  'https://cdns.iconmonstr.com/wp-content/releases/preview/2013/240/iconmonstr-qr-code-2.png';

const shareImg =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb7oxYjncQ8kZOklOJLLOQRL9Lf4XaqwC2dQ&usqp=CAU';

const HomeScreen = ({navigation}) => {
  const [userInfo, setUserInfo] = useState({});
  const [mycards, setMyCards] = useState([]);
  const myId = auth().currentUser.uid;

  useEffect(() => {
    UserInfo(myId, setUserInfo);
  }, []);

  const navigateToScreens = t => {
    t == 'MakeCard'
      ? navigation.navigate('MakeCard')
      : t == 'Scan'
      ? navigation.navigate('Scan')
      : auth().signOut();

    //  Share.share({
    //    message:
    //      'React Native | A framework for building native apps using React',
    //  });
  };

  useEffect(() => {
    firestore()
      .collection('AllCards')
      .doc(myId)
      .collection('myCards')
      .orderBy('createAt', 'desc')
      .get()
      .then(querySnapshot => {
        let userData = [];

        querySnapshot.forEach(documentSnapshot => {
          userData.push({
            id: documentSnapshot.id,
            value: documentSnapshot.data(),
          });
        });

        setMyCards(userData);
      });
  }, [mycards]);
  return (
    <View style={styles.root}>
      <View style={styles.topContainer}></View>
      <View style={styles.navigateWrapper}>
        <View style={styles.itemsWrapper}>
          <NavigateComp
            text="Make Card"
            img={PlusIconImg}
            onClick={() => navigateToScreens('MakeCard')}
          />
          <NavigateComp
            text="Scan Code"
            img={qrImg}
            onClick={() => navigateToScreens('Scan')}
          />
          <NavigateComp
            text="Share"
            img={shareImg}
            onClick={() => navigateToScreens('Share')}
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.mainContentWrapper}>
        {mycards.length ? (
          mycards.map(cardData => (
            <Card key={cardData.id} cardData={cardData} />
          ))
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 17}}>No Card's</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const Card = ({cardData}) => {
  return (
    <View style={styles.profileWrapper}>
      <View style={styles.profileDetailsWrapper}>
        <View style={styles.imgContainer}>
          <Image
            source={{uri: cardData.value.photoURL}}
            style={styles.imgStyle}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{cardData.value.name}</Text>
          <Text style={styles.positon}>{cardData.value.position}</Text>
          <Text style={styles.positon}>{cardData.value.buisnessType}</Text>
        </View>
      </View>
      <View style={styles.informationContainer}>
        <View style={styles.flexStyle}>
          <Ionicons name="call" size={18} />
          <Text style={styles.infoTextStyle}>{cardData.value.number}</Text>
        </View>
        <View style={[styles.flexStyle, {marginTop: 5}]}>
          <Ionicons name="location-sharp" size={18} />
          <Text style={styles.infoTextStyle}>{cardData.value.adderss}</Text>
        </View>
      </View>
    </View>
  );
};

const NavigateComp = ({text, onClick, img}) => (
  <TouchableOpacity style={styles.item} onPress={onClick}>
    <Image source={{uri: img}} style={styles.iconImgStyle} />
    <Text>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  topContainer: {
    width: '100%',
    height: '15%',
    backgroundColor: COLORS.primary,
  },
  navigateWrapper: {
    marginHorizontal: 15,
    marginTop: -40,
    backgroundColor: COLORS.white,
    elevation: 1,
    height: '25%',
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },

  iconImgStyle: {
    width: 25,
    height: 25,
    marginBottom: 8,
  },
  itemsWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContentWrapper: {
    padding: 15,
  },
  profileWrapper: {
    width: '100%',
    backgroundColor: COLORS.white,
    height: 170,
    borderRadius: 5,
    padding: 15,
    elevation: 1,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  profileDetailsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgContainer: {
    width: 65,
    height: 65,
  },
  imgStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  detailsContainer: {
    marginLeft: 15,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 2,
    color: '#000',
  },
  positon: {
    marginBottom: 2,
    fontSize: 13,
  },
  flexStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  informationContainer: {},
  infoTextStyle: {
    marginLeft: 8,
    fontSize: 13,
  },
});
