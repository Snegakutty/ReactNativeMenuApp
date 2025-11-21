import {StyleSheet} from 'react-native';
import {theme} from '../../theme';

export const categoryCardStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.m,
    padding: theme.spacing.l,
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: 60,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    marginBottom: theme.spacing.s,
  },
  active: {
    backgroundColor: theme.colors.primary, // Active is now Main Blue
    borderColor: theme.colors.primaryHover,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    ...theme.typography.body,
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.primary, // Inactive text is Blue
  },
  activeText: {
    color: theme.colors.surface, // Active text is White
  },
});