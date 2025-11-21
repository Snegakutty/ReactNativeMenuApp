import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { itemDetailModalStyles } from '../styles/components/itemDetailModal.styles';

type QuantitySelectorProps = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
}) => {
  return (
    <View style={[itemDetailModalStyles.quantitySelector, { marginTop: 20, marginBottom: 20 }]}>
      <Pressable
        style={itemDetailModalStyles.quantityButton}
        onPress={onDecrease}
      >
        <Text style={itemDetailModalStyles.quantityButtonText}>-</Text>
      </Pressable>
      
      <Text style={itemDetailModalStyles.quantityText}>{quantity}</Text>
      
      <Pressable
        style={itemDetailModalStyles.quantityButton}
        onPress={onIncrease}
      >
        <Text style={itemDetailModalStyles.quantityButtonText}>+</Text>
      </Pressable>
    </View>
  );
};