import React from 'react';
import { View } from 'react-native';
import { Item } from '../../services/api';
import { ItemCard } from '../../components/ItemCard';
import { dashboardStyles } from '../../styles/screens/dashboard.styles';

import { useAppDispatch } from '../../store';

import { setSelectedItem, setModalVisible } from '../../store/slices/uiSlice';
import { fetchAddonsForItem } from '../../store/slices/addonsSlice';

type Props = {
  items: Item[];
};

export default function ItemsList({ items }: Props) {
  const dispatch = useAppDispatch();

  const onItemPress = (item: Item) => {
    dispatch(setSelectedItem(item));
    dispatch(fetchAddonsForItem(item.id));
    dispatch(setModalVisible(true));
  };

  return (
    <View style={dashboardStyles.itemsList}>
      {items.map(item => (
        <ItemCard
          key={item.id}
          name={item.name}
          price={item.price}
          vegType={item.veg_type}
          isBestseller={item.is_bestseller}
          size={item.size}
          prepTime={item.prep_time_mins}
          onPress={() => onItemPress(item)}
        />
      ))}
    </View>
  );
}
