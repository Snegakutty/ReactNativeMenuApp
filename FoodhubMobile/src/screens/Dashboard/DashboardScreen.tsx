import React, { useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store';

import {
  fetchCategories,
  selectCategories,
  selectCategoriesLoading,
  selectCategoriesError,
} from '../../store/slices/categoriesSlice';

import { dashboardStyles } from '../../styles/screens/dashboard.styles';
import { theme } from '../../theme';

import DashboardHeader from './DashboardHeader';
import CategoriesList from './CategoriesList';
import ItemModalController from './ItemModalController';


export const DashboardScreen = () => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(selectCategories);
  const categoriesLoading = useAppSelector(selectCategoriesLoading);
  const categoriesError = useAppSelector(selectCategoriesError);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);


  return (
    <SafeAreaView style={dashboardStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />

      <View style={dashboardStyles.container}>
        <DashboardHeader />

        {categoriesLoading ? (
          <ActivityIndicator color={theme.colors.primary} />
        ) : categoriesError ? (
          <Text style={dashboardStyles.errorText}>{categoriesError}</Text>
        ) : (
          <CategoriesList categories={categories} />
        )}

        <ItemModalController />
      </View>
    </SafeAreaView>
  );
};
