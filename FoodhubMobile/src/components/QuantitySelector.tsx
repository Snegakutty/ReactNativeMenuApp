import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { itemDetailModalStyles } from '../styles/components/itemDetailModal.styles';

type QuantitySelectorProps = {
  quantity: number;
  setQuantity: (quantity: number) => void;
  onAddToCart: () => void;
};

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  setQuantity,
  onAddToCart,
}) => {
  return (
    <View>
      <View style={itemDetailModalStyles.quantitySelector}>
        <Pressable
          style={itemDetailModalStyles.quantityButton}
          onPress={() => setQuantity(Math.max(1, quantity - 1))}
        >
          <Text style={itemDetailModalStyles.quantityButtonText}>-</Text>
        </Pressable>
        <Text style={itemDetailModalStyles.quantityText}>{quantity}</Text>
        <Pressable
          style={itemDetailModalStyles.quantityButton}
          onPress={() => setQuantity(quantity + 1)}
        >
          <Text style={itemDetailModalStyles.quantityButtonText}>+</Text>
        </Pressable>
      </View>
      <Pressable
        style={itemDetailModalStyles.nextButton}
        onPress={onAddToCart}
      >
        <Text style={itemDetailModalStyles.nextText}>Next</Text>
      </Pressable>
    </View>
  );
};
