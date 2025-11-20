import React, { useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, StatusBar, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store';

import {
  fetchFullMenu,
  selectCategories,
  selectMenuLoading,
  selectMenuLoaded,
} from '../../store/slices/menuSlice';

import { dashboardStyles } from '../../styles/screens/dashboard.styles';
import { theme } from '../../theme';

import DashboardHeader from './DashboardHeader';
import CategoriesList from './CategoriesList';
import ItemModalController from './ItemModalController';

export const DashboardScreen = () => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectMenuLoading);
  const loaded = useAppSelector(selectMenuLoaded);

  useEffect(() => {
    if (!loaded) {
      dispatch(fetchFullMenu());
    }
  }, [dispatch, loaded]);

  return (
    <SafeAreaView style={dashboardStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />

      <View style={dashboardStyles.container}>
        <DashboardHeader />

        {loading ? (
          <ActivityIndicator color={theme.colors.primary} />
        ) : (
          <CategoriesList categories={categories} />
        )}

        <ItemModalController />
      </View>
    </SafeAreaView>
  );
};
