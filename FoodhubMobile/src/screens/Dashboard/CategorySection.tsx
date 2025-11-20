import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Category } from '../../services/api';
import { CategoryCard } from '../../components/CategoryCard';

import { useAppDispatch, useAppSelector } from '../../store';

import {
  fetchItemsForCategory,
  selectItemsMap,
  selectItemsLoadingCategoryId,
  selectItemsError
} from '../../store/slices/itemsSlice';

import {
  setSelectedCategory,
  selectSelectedCategoryId
} from '../../store/slices/uiSlice';

import ItemsList from './ItemsList';
import { dashboardStyles } from '../../styles/screens/dashboard.styles';
import { theme } from '../../theme';

type Props = {
  category: Category;
};

export default function CategorySection({ category }: Props) {
  const dispatch = useAppDispatch();

  const itemsMap = useAppSelector(selectItemsMap);
  const loadingCategoryId = useAppSelector(selectItemsLoadingCategoryId);
  const selectedCategoryId = useAppSelector(selectSelectedCategoryId);
  const itemsError = useAppSelector(selectItemsError);

  const isSelected = selectedCategoryId === category.id;
  const categoryItems = itemsMap[category.id];

  const isLoading = loadingCategoryId === category.id;

  const handlePress = () => {
    if (isSelected) {
      dispatch(setSelectedCategory(null));
      return;
    }

    dispatch(setSelectedCategory(category.id));

    if (!itemsMap[category.id]) {
      dispatch(fetchItemsForCategory(category.id));
    }
  };

  return (
    <View>
      <CategoryCard
        name={category.name}
        onPress={handlePress}
        isActive={isSelected}
      />

      {isSelected && (
        <View style={dashboardStyles.itemsContainer}>
          {isLoading ? (
            <ActivityIndicator color={theme.colors.primary} />
          ) : itemsError ? (
            <Text style={dashboardStyles.errorText}>{itemsError}</Text>
          ) : !categoryItems || categoryItems.length === 0 ? (
            <Text style={dashboardStyles.placeholder}>No items in this category</Text>
          ) : (
            <ItemsList items={categoryItems} />
          )}
        </View>
      )}
    </View>
  );
}
