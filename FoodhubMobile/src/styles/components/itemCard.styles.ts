import {StyleSheet} from 'react-native';
import {theme} from '../../theme';

export const itemCardStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.m,
    padding: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder, // Uses the new blue border
    marginLeft: theme.spacing.l,
    marginBottom: theme.spacing.s,
    // Added subtle shadow for depth
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pressed: {
    opacity: 0.7,
  },
  name: {
    ...theme.typography.body,
    fontWeight: '600',
    color: theme.colors.heading, // Dark Navy
    marginBottom: theme.spacing.xs,
  },
  price: {
    ...theme.typography.heading,
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.primary, // Main Blue
    marginBottom: theme.spacing.s,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  detailTag: {
    ...theme.typography.caption,
    backgroundColor: theme.colors.surfaceAlt, // Light Blue bg
    paddingHorizontal: theme.spacing.s,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radii.s,
    color: theme.colors.primary, // Blue text
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
});