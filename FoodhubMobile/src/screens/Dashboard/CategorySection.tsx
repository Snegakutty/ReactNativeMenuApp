import React, { useState } from 'react';
import { View } from 'react-native';
import { useAppSelector } from '../../store';
import { selectItemsByCategory } from '../../store/slices/menuSlice';

import { CategoryCard } from '../../components/CategoryCard';
import ItemsList from './ItemsList';
import { Category } from '../../services/api';
import { dashboardStyles } from '../../styles/screens/dashboard.styles';

type Props = {
  category: Category;
};

export default function CategorySection({ category }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const itemsByCategory = useAppSelector(selectItemsByCategory);
  const items = itemsByCategory[category.id];

  const handlePress = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <View>
      <CategoryCard
        name={category.name}
        onPress={handlePress}
        isActive={isOpen}
      />

      {isOpen && items && (
        <View style={dashboardStyles.itemsContainer}>
          <ItemsList items={items} />
        </View>
      )}
    </View>
  );
}
