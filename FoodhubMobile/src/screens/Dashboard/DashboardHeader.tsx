import React from 'react';
import { Text } from 'react-native';
import { dashboardStyles } from '../../styles/screens/dashboard.styles';

export default function DashboardHeader() {
  return <Text style={dashboardStyles.heading}>FoodHub Menu</Text>;
}
