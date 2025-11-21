import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { dashboardStyles } from '../../styles/screens/dashboard.styles';
import { CartIcon } from '../../components/CartIcon';

export default function DashboardHeader() {
  return (
    <View style={localStyles.headerContainer}>
      <Text style={dashboardStyles.heading}>FoodHub Menu</Text>
      <CartIcon />
    </View>
  );
}

const localStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Pushes items to edges
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff', // Ensure header has background
  }
});