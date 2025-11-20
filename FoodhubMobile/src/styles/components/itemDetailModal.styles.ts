import {StyleSheet} from 'react-native';
import {theme} from '../../theme';

export const itemDetailModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.l,
  },
  modal: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.l,
    width: '100%',
    maxWidth: 600,
    maxHeight: '90%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.cardBorder,
  },
  title: {
    ...theme.typography.heading,
    fontWeight: '700',
    color: theme.colors.heading,
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 24,
    color: theme.colors.surface,
    lineHeight: 28,
  },
  content: {
    padding: theme.spacing.l,
  },
  price: {
    ...theme.typography.heading,
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.spacing.l,
  },
  section: {
    marginBottom: theme.spacing.l,
  },
  sectionTitle: {
    ...theme.typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: theme.colors.muted,
    marginBottom: theme.spacing.s,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  tag: {
    ...theme.typography.caption,
    backgroundColor: theme.colors.cardBorder,
    paddingHorizontal: theme.spacing.s,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radii.s,
    color: theme.colors.muted,
  },
  addonsList: {
    gap: theme.spacing.s,
  },
  addonItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.cardBorder,
    padding: theme.spacing.m,
    borderRadius: theme.radii.s,
  },
  addonName: {
    ...theme.typography.body,
    fontWeight: '500',
    color: theme.colors.heading,
  },
  addonPrice: {
    ...theme.typography.body,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  noAddons: {
    ...theme.typography.body,
    color: theme.colors.muted,
    fontStyle: 'italic',
  },
  addItemButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.m,
    borderRadius: theme.radii.m,
    alignItems: 'center',
    marginTop: theme.spacing.l,
  },
  addItemText: {
    ...theme.typography.button,
    color: theme.colors.surface,
    fontWeight: '600',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.l,
    gap: theme.spacing.m,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.heading,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.heading,
    minWidth: 30,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.m,
    borderRadius: theme.radii.m,
    alignItems: 'center',
    marginTop: theme.spacing.m,
  },
  nextText: {
    ...theme.typography.button,
    color: theme.colors.surface,
    fontWeight: '600',
  },
});

