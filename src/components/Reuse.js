import {
  TextInput,
  View,
  StyleSheet,
  Pressable,
  Text,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../Color/Coolor';
import BackIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export const Input = ({placeholder, extraStyle, setValue}) => (
  <TextInput
    style={[styles.inputStyle, extraStyle]}
    placeholder={placeholder}
    onChangeText={text => setValue(text)}
  />
);

export const BackComp = ({text}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.backContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackIcon name="arrow-back" size={25} />
      </TouchableOpacity>
      <Text
        style={{
          marginLeft: 10,
          fontSize: 17,
        }}>
        {text}
      </Text>
    </View>
  );
};

export const ButtonComp = ({
  text,
  btnExtraStyle,
  btnTextExtraStyle,
  onClick,
}) => (
  <TouchableOpacity
    style={[styles.btnContainer, btnExtraStyle]}
    activeOpacity={0.8}
    onPress={onClick}>
    <Text style={[styles.btnText, btnTextExtraStyle]}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  inputStyle: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: COLORS.darkGray,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: COLORS.darkGray,
    fontSize: 18,
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 45,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginBottom: 8,
  },
});
