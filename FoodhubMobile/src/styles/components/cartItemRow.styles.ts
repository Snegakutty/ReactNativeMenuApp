import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const cartItemRowStyles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', 
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: theme.colors.text,
  },
  itemPrice: {
    fontSize: 14,
    color: theme.colors.muted,
  },
  controlsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topDeleteBtn: {
    marginLeft: 12,
    padding: 8,
    backgroundColor: '#FFEBEE', // Keep light red for delete
    borderRadius: 6,
  },
  deleteText: {
    fontSize: 16,
    color: theme.colors.danger,
  },
  addonSummaryText: {
    fontSize: 12, 
    color: theme.colors.muted, 
    marginTop: 4,
    fontStyle: 'italic',
  },
  customizeBtn: {
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.surfaceAlt, // Light Blue
    borderRadius: 15,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  customizeText: {
    fontSize: 12,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  addonListContainer: {
    marginTop: 10,
    backgroundColor: '#F1F8FF', // Very faint blue
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  addonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.cardBorder,
  },
  addonName: {
    fontSize: 14,
    color: theme.colors.text,
    maxWidth: '45%',
  },
  addonControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallBtn: {
    width: 26,
    height: 26,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
  },
  disabledBtn: {
    opacity: 0.3,
    borderColor: theme.colors.border,
  },
  addonCount: {
    marginHorizontal: 8,
    fontSize: 14,
    fontWeight: 'bold',
    minWidth: 16,
    textAlign: 'center',
    color: theme.colors.heading,
  },
  delBtn: {
    marginLeft: 8,
    paddingHorizontal: 6,
  },
  delText: {
    fontSize: 20,
    color: theme.colors.muted,
    fontWeight: '300',
  },
  smallBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 18,   
  }
});