import {StyleSheet} from 'react-native';
import {theme} from '../../theme';

export const itemCardStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF3E0', 
    borderRadius: theme.radii.m,
    padding: theme.spacing.m,
    borderWidth: 2,
    borderColor: '#FF9800', 
    marginLeft: theme.spacing.l, 
    marginBottom: theme.spacing.s,
  },
  pressed: {
    opacity: 0.7,
  },
  name: {
    ...theme.typography.body,
    fontWeight: '600',
    color: '#E65100', 
    marginBottom: theme.spacing.xs,
  },
  price: {
    ...theme.typography.heading,
    fontSize: 20,
    fontWeight: '700',
    color: '#F57C00', 
    marginBottom: theme.spacing.s,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  detailTag: {
    ...theme.typography.caption,
    backgroundColor: '#FFE0B2', 
    paddingHorizontal: theme.spacing.s,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radii.s,
    color: '#E65100', 
  },
});

