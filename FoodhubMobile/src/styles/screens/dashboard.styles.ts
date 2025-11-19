import {StyleSheet} from 'react-native';
import {theme} from '../../theme';

export const dashboardStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.l,
    paddingBottom: theme.spacing.xl,
  },
  heading: {
    ...theme.typography.heading,
    textAlign: 'center',
    color: theme.colors.heading,
  },
  placeholder: {
    ...theme.typography.caption,
    color: theme.colors.muted,
  },
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.danger,
    fontWeight: '600',
  },
  categoriesSection: {
    gap: theme.spacing.m,
  },
  categoriesList: {
    flexDirection: 'column',
    gap: theme.spacing.xs,
  },
  itemsContainer: {
    marginTop: theme.spacing.s,
    marginBottom: theme.spacing.m,
  },
  itemsList: {
    flexDirection: 'column',
    gap: theme.spacing.xs,
  },
});

