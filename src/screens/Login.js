import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {ButtonComp, Input} from '../components/Reuse';
import {pageStyles} from './pageStyles/pageStyles';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const imgLInk =
  'https://joyofandroid.com/wp-content/uploads/2019/05/zerones-business-card-maker-and-creator-e1559143425671.png';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submitData = async () => {
    setLoading(true);
    if (!email || !password) {
      setLoading(false);
      alert('fill the all input');
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setLoading(false);
        alert('Login succesfull');
        navigation.navigate('Home');
      })
      .catch(err => {
        setLoading(false);
        alert('something went wrong!');
      });
  };

  return (
    <View style={pageStyles.root}>
      <Text style={pageStyles.titleText}>Login</Text>
      <View style={pageStyles.contentWrapper}>
        <View style={pageStyles.logoWrapper}>
          <Image source={{uri: imgLInk}} style={pageStyles.logo} />
        </View>
        <Input placeholder={'Email'} setValue={setEmail} />
        <Input placeholder={'Password'} setValue={setPassword} />
        <ButtonComp
          text={loading ? 'Loggingin...' : 'Login'}
          onClick={submitData}
        />
        <View style={pageStyles.footerTextWrapper}>
          <Text style={pageStyles.accountText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={pageStyles.linkText}>Register Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
