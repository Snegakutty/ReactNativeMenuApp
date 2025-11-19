import {StyleSheet} from 'react-native';
import {theme} from '../../theme';

export const categoryCardStyles = StyleSheet.create({
  container: {
    backgroundColor: '#E3F2FD', 
    borderRadius: theme.radii.m,
    padding: theme.spacing.l,
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: 60,
    borderWidth: 2,
    borderColor: '#2196F3', 
    marginBottom: theme.spacing.s,
  },
  active: {
    backgroundColor: '#2196F3', 
    borderColor: '#1976D2',
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    ...theme.typography.body,
    fontSize: 18,
    fontWeight: '600',
    color: '#1976D2', 
  },
  activeText: {
    color: theme.colors.surface, 
  },
});

