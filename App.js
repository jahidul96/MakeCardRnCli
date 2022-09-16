import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import HomeScreen from './src/screens/HomeScreen';
import auth from '@react-native-firebase/auth';
import Loading from './src/screens/Loading';
import MakeCard from './src/screens/MakeCard';
import Scan from './src/screens/Scan';
import Profile from './src/screens/Profile';
import EditProfile from './src/screens/EditProfile';
import QrScaner from './src/screens/QrScaner';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NavigationContainer>
      {initializing ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="loading" component={Loading} />
        </Stack.Navigator>
      ) : user ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="MakeCard" component={MakeCard} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Scan" component={Scan} />
          <Stack.Screen name="QrScaner" component={QrScaner} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
