import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {ButtonComp, Input} from '../components/Reuse';
import {pageStyles} from './pageStyles/pageStyles';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {AddUser} from '../FbFunctions/FbFunctions';

const imgLInk =
  'https://joyofandroid.com/wp-content/uploads/2019/05/zerones-business-card-maker-and-creator-e1559143425671.png';

const Register = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submitData = async () => {
    setLoading(true);
    if (!username || !email || !password) {
      alert('fill the all input');
      setLoading(false);
      return;
    }
    let userData = {email, username};
    AddUser(email, password, userData, setLoading, navigation);
  };
  return (
    <View style={pageStyles.root}>
      <Text style={pageStyles.titleText}>Register</Text>
      <View style={[pageStyles.contentWrapper, {height: '70%'}]}>
        <View style={pageStyles.logoWrapper}>
          <Image source={{uri: imgLInk}} style={pageStyles.logo} />
        </View>
        <Input placeholder={'Username'} setValue={setUsername} />
        <Input placeholder={'Email'} setValue={setEmail} />
        <Input placeholder={'Password'} setValue={setPassword} />
        <ButtonComp
          text={loading ? 'Submiting...' : 'Submit'}
          onClick={submitData}
        />
        <View style={pageStyles.footerTextWrapper}>
          <Text style={pageStyles.accountText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={pageStyles.linkText}>Login Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;
