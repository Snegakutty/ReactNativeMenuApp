import React from 'react';
import {Pressable, Text, View, ViewStyle} from 'react-native';
import {itemCardStyles} from '../styles/components/itemCard.styles';
import {formatCurrency} from '../utils/formatCurrency';

type ItemCardProps = {
  name: string;
  price: number;
  vegType?: string;
  isBestseller?: boolean;
  size?: string | null;
  prepTime?: number | null;
  onPress: () => void;
  style?: ViewStyle;
};

export const ItemCard: React.FC<ItemCardProps> = ({
  name,
  price,
  vegType,
  isBestseller,
  size,
  prepTime,
  onPress,
  style,
}) => {
  return (
    <Pressable
      style={({pressed}) => [
        itemCardStyles.container,
        pressed && itemCardStyles.pressed,
        style,
      ]}
      onPress={onPress}>
      <Text style={itemCardStyles.name}>
        {name}--{formatCurrency(price)}
      </Text>
      <View style={itemCardStyles.details}>
        {vegType && (
          <Text style={itemCardStyles.detailTag}>
            {vegType.toUpperCase()}
          </Text>
        )}
        {isBestseller && (
          <Text style={itemCardStyles.detailTag}>⭐ Bestseller</Text>
        )}
        {size && <Text style={itemCardStyles.detailTag}>{size}</Text>}
        {prepTime && (
          <Text style={itemCardStyles.detailTag}>{prepTime} mins</Text>
        )}
      </View>
    </Pressable>
  );
};

