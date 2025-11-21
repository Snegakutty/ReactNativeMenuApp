import React from 'react';
import { Text, View } from 'react-native';
import { itemDetailModalStyles } from '../styles/components/itemDetailModal.styles';
import { Item } from '../services/api';
import { formatCurrency } from '../utils/formatCurrency';

type ItemDetailsProps = {
  item: Item;
};

export const ItemDetails: React.FC<ItemDetailsProps> = ({ item }) => {
  return (
    <>
      <Text style={itemDetailModalStyles.price}>
        {formatCurrency(item.price)}
      </Text>

      <View style={itemDetailModalStyles.section}>
        <Text style={itemDetailModalStyles.sectionTitle}>Details</Text>
        <View style={itemDetailModalStyles.tags}>
         
          {item.veg_type ? (
            <Text style={itemDetailModalStyles.tag}>
              {item.veg_type.toUpperCase()}
            </Text>
          ) : null}

          {item.is_bestseller ? (
            <Text style={itemDetailModalStyles.tag}>⭐ Bestseller</Text>
          ) : null}

          {item.size ? (
            <Text style={itemDetailModalStyles.tag}>
              Size: {item.size}
            </Text>
          ) : null}

          {item.prep_time_mins ? (
            <Text style={itemDetailModalStyles.tag}>
              Prep: {item.prep_time_mins} mins
            </Text>
          ) : null}
          
        </View>
      </View>
    </>
  );
};