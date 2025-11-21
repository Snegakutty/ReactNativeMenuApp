import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const cartIconStyles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: 8,
    marginRight: 8,
  },
  iconText: {
    fontSize: 24,
    color: theme.colors.primary, // Icon is now Blue
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: theme.colors.danger,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.background,
  },
  badgeText: {
    color: theme.colors.surface,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});