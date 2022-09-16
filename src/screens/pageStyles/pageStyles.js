import {StyleSheet} from 'react-native';
import {COLORS} from '../../Color/Coolor';

export const pageStyles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: COLORS.primary,
  },
  titleText: {
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    letterSpacing: 1,
  },
  contentWrapper: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    width: 70,
    height: 70,
    marginBottom: 20,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 100 / 2,
  },
  footerTextWrapper: {
    marginVertical: 10,
  },
  accountText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  linkText: {
    textAlign: 'center',
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});
