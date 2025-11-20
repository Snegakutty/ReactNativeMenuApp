import React, { useRef } from 'react';
import { View, Text, FlatList, Pressable, Animated, Dimensions } from 'react-native';
import { useAppSelector, useAppDispatch } from '../store';
import { incrementQuantity, decrementQuantity, removeItem, clearCart } from '../store/slices/cartSlice';
import { formatCurrency } from '../utils/formatCurrency';
import { styles } from '../styles/components/cartScreen.styles';


export default function CartScreen({ navigation }: any) {
  const cartItems = useAppSelector((state: any) => state.cart.items);
  const dispatch = useAppDispatch();
  const { width } = Dimensions.get('window');
  const slideAnimations = useRef(new Map()).current;

  const total = cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

  const handleDelete = (itemId: number) => {
    const animation = slideAnimations.get(itemId) || new Animated.Value(0);
    slideAnimations.set(itemId, animation);
    Animated.timing(animation, {
      toValue: -width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      dispatch(removeItem(itemId));
      slideAnimations.delete(itemId);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      {cartItems.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        <View>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const slideAnim = slideAnimations.get(item.id) || new Animated.Value(0);
              slideAnimations.set(item.id, slideAnim);
              return (
                <Animated.View style={[styles.itemContainer, { transform: [{ translateX: slideAnim }] }]}>
                  <View>
                    <Text>{item.name}</Text>
                    <Text>{formatCurrency(item.price)} x {item.quantity}</Text>
                  </View>
                  <View style={styles.quantityContainer}>
                    <Pressable onPress={() => dispatch(decrementQuantity(item.id))} style={styles.quantityButton}>
                      <Text>-</Text>
                    </Pressable>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <Pressable onPress={() => dispatch(incrementQuantity(item.id))} style={styles.quantityButton}>
                      <Text>+</Text>
                    </Pressable>
                    <Pressable onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                      <Text style={styles.buttonText}>Delete</Text>
                    </Pressable>
                  </View>
                </Animated.View>
              );
            }}
          />
          <Text style={styles.totalText}>Total: {formatCurrency(total)}</Text>
          <Pressable onPress={() => dispatch(clearCart())} style={styles.clearButton}>
            <Text style={styles.buttonText}>Clear Cart</Text>
          </Pressable>
        </View>
      )}
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.buttonText}>Back to Menu</Text>
      </Pressable>
    </View>
  );
}
