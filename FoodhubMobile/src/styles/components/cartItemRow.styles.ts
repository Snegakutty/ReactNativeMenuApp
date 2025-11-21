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
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
  },
  controlsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topDeleteBtn: {
    marginLeft: 12,
    padding: 8,
    backgroundColor: '#ffeeee',
    borderRadius: 6,
  },
  deleteText: {
    fontSize: 16,
    color: 'red',
  },
  addonSummaryText: {
    fontSize: 12, 
    color: '#666', 
    marginTop: 4,
    fontStyle: 'italic',
  },
  customizeBtn: {
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  customizeText: {
    fontSize: 12,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  addonListContainer: {
    marginTop: 10,
    backgroundColor: '#fafafa',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  addonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  addonName: {
    fontSize: 14,
    color: '#333',
    maxWidth: '45%',
  },
  addonControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallBtn: {
    width: 26,
    height: 26,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
  },
  disabledBtn: {
    opacity: 0.3,
    borderColor: '#eee',
  },
  addonCount: {
    marginHorizontal: 8,
    fontSize: 14,
    fontWeight: 'bold',
    minWidth: 16,
    textAlign: 'center',
  },
  delBtn: {
    marginLeft: 8,
    paddingHorizontal: 6,
  },
  delText: {
    fontSize: 20,
    color: '#999',
    fontWeight: '300',
  },
});