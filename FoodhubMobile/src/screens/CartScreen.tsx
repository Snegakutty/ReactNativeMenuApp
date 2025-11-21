import React, { useEffect } from 'react';
import { View, Text, FlatList, Pressable, Dimensions } from 'react-native';
import { useAppSelector, useAppDispatch } from '../store';
import { clearCart } from '../store/slices/cartSlice';
import { formatCurrency } from '../utils/formatCurrency';
import { styles } from '../styles/components/cartScreen.styles';
import { CartItemRow } from '../components/CartItemRow';

export default function CartScreen({ navigation }: any) {
  const cartItems = useAppSelector((state: any) => state.cart.items);
  const dispatch = useAppDispatch();
  const { width } = Dimensions.get('window');

 
  const total = cartItems.reduce((sum: number, item: any) => {
   
    const basePrice = Number(item.price) || 0;

    
    const addonsCostPerUnit = item.selectedAddons.reduce((acc: number, addon: any) => {
      return acc + (Number(addon.price) || 0); 
    }, 0);

    
    const unitPrice = basePrice + addonsCostPerUnit;

    
    return sum + (unitPrice * item.quantity);
  }, 0);

  
  useEffect(() => {
    if (cartItems.length === 0) {
      navigation.popToTop();
    }
  }, [cartItems, navigation]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      
      <View style={{ flex: 1 }}>
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => index.toString()} 
          renderItem={({ item, index }) => (
            <CartItemRow 
                item={item} 
                index={index} 
                width={width} 
            />
          )}
        />
        
        <Text style={styles.totalText}>Total: {formatCurrency(total)}</Text>
        
        <Pressable onPress={handleClearCart} style={styles.clearButton}>
          <Text style={styles.buttonText}>Clear Cart</Text>
        </Pressable>
      </View>

      
    </View>
  );
}