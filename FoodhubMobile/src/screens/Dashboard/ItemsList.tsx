import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Item } from '../../services/api';
import { ItemCard } from '../../components/ItemCard';
import { dashboardStyles } from '../../styles/screens/dashboard.styles';

import { useAppDispatch } from '../../store';
import { setSelectedItem, setModalVisible } from '../../store/slices/uiSlice';

export default function ItemsList({ items }: { items: Item[] }) {
  const dispatch = useAppDispatch();

  const onItemPress = (item: Item) => {
    dispatch(setSelectedItem(item));
    dispatch(setModalVisible(true));
  };

  return (
    <View style={dashboardStyles.itemsList}>
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ItemCard
            name={item.name}
            price={item.price}
            vegType={item.veg_type}
            isBestseller={item.is_bestseller}
            size={item.size}
            prepTime={item.prep_time_mins}
            onPress={() => onItemPress(item)}
          />
        )}
      />
    </View>
  );
}
