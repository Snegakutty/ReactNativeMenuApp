import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const cartIconStyles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: 8,
    marginRight: 8,
  },
  iconText: {
    fontSize: 24, // Size of the Cart Emoji/Icon
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.background,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


