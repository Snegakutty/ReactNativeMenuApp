import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.heading,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: theme.colors.surface,
    padding: 10,
    borderRadius: theme.radii.s,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 10,
    backgroundColor: theme.colors.surfaceAlt, // Light Blue
    borderRadius: theme.radii.xs,
  },
  quantityText: {
    marginHorizontal: 10,
    color: theme.colors.text,
    fontWeight: '600',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: theme.colors.heading,
  },
  clearButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: theme.colors.primary, // White Background
    borderWidth: 1,
    borderColor: theme.colors.danger,
    borderRadius: theme.radii.m,
    alignItems: 'center',
  },
  backButton: {
    marginTop: 10,
    padding: 12,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radii.m,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.surface,
    fontWeight: '600',
  },
  
  clearButtonText: {
      color: theme.colors.danger,
      fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: theme.colors.danger,
    padding: 10,
    marginLeft: 10,
    borderRadius: theme.radii.s,
  },
});