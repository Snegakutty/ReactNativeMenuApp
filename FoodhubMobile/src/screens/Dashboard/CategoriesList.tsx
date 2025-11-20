import React from 'react';
import { FlatList } from 'react-native';
import { Category } from '../../services/api';
import CategorySection from './CategorySection';
import { dashboardStyles } from '../../styles/screens/dashboard.styles';

type Props = {
  categories: Category[];
};

export default function CategoriesList({ categories }: Props) {
  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => <CategorySection category={item} />}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={dashboardStyles.content}
    />
  );
}
