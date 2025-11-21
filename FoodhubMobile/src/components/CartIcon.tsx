
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../store';
import { cartIconStyles } from '../styles/components/cartIcon.styles';
export const CartIcon = () => {
  const navigation = useNavigation<any>();
  const cartItems = useAppSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
 
  const isEmpty = totalQuantity === 0;

  return (
    <Pressable 
      
      disabled={isEmpty} 
      
      
      style={({ pressed }) => [
        cartIconStyles.container,
        { opacity: isEmpty ? 0.3 : (pressed ? 0.7 : 1) }
      ]}
      
      onPress={() => navigation.navigate('Cart')}
    >
      <Text style={cartIconStyles.iconText}>🛒</Text>

      {!isEmpty && (
        <View style={cartIconStyles.badge}>
          <Text style={cartIconStyles.badgeText}>
            {totalQuantity > 99 ? '99+' : totalQuantity}
          </Text>
        </View>
      )}
    </Pressable>
  );
};