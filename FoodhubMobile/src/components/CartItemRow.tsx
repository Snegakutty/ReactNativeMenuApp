import React, { useState, useRef } from 'react'; // Import useRef
import { View, Text, Pressable, Animated } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { incrementQuantity, decrementQuantity, removeItem, updateItemAddons } from '../store/slices/cartSlice';
import { formatCurrency } from '../utils/formatCurrency';
import { Addon } from '../services/api';
import { styles as cartScreenStyles } from '../styles/components/cartScreen.styles';
import { cartItemRowStyles } from '../styles/components/cartItemRow.styles';

type Props = {
  item: any;
  index: number;
  width: number;
 
};

export const CartItemRow = ({ item, index, width }: Props) => {
  const dispatch = useAppDispatch();
  const [isCustomizing, setIsCustomizing] = useState(false);
  
 const slideAnim = useRef(new Animated.Value(0)).current;

  const allAddons = useAppSelector(state => state.menu.addonsByItem[item.id] || []);

  const handleDelete = () => {
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      dispatch(removeItem(item.id));
      
    });
  };

  const getAddonCount = (addonId: number) => {
    return item.selectedAddons.filter((a: Addon) => a.id === addonId).length;
  };

  const handleAddonChange = (addon: Addon, action: 'inc' | 'dec' | 'del') => {
    let newAddons = [...item.selectedAddons];
    if (action === 'inc') {
      newAddons.push(addon);
    } else if (action === 'dec') {
      const indexToRemove = newAddons.findIndex(a => a.id === addon.id);
      if (indexToRemove !== -1) newAddons.splice(indexToRemove, 1);
    } else if (action === 'del') {
      newAddons = newAddons.filter(a => a.id !== addon.id);
    }
    dispatch(updateItemAddons({ index, newAddons }));
  };

  
  return (
    <Animated.View style={[cartScreenStyles.itemContainer, { transform: [{ translateX: slideAnim }] }]}>
       <View style={{ flex: 1 }}>
        <View style={cartItemRowStyles.headerRow}>
            <View style={cartItemRowStyles.infoContainer}>
                <Text style={cartItemRowStyles.itemName}>{item.name}</Text>
                <Text style={cartItemRowStyles.itemPrice}>{formatCurrency(item.price)} x {item.quantity}</Text>
            </View>
            <View style={cartItemRowStyles.controlsRight}>
                <View style={cartScreenStyles.quantityContainer}>
                    <Pressable onPress={() => dispatch(decrementQuantity(item.id))} style={cartScreenStyles.quantityButton}>
                        <Text>-</Text>
                    </Pressable>
                    <Text style={cartScreenStyles.quantityText}>{item.quantity}</Text>
                    <Pressable onPress={() => dispatch(incrementQuantity(item.id))} style={cartScreenStyles.quantityButton}>
                        <Text>+</Text>
                    </Pressable>
                </View>
                <Pressable onPress={handleDelete} style={cartItemRowStyles.topDeleteBtn}>
                    <Text style={cartItemRowStyles.deleteText}>🗑</Text>
                </Pressable>
            </View>
        </View>

        {!isCustomizing && item.selectedAddons.length > 0 && (
          <Text style={cartItemRowStyles.addonSummaryText}>
            Addons: {item.selectedAddons.map((a: Addon) => a.name).join(', ')}
          </Text>
        )}

        {allAddons.length > 0 && (
            <Pressable 
                onPress={() => setIsCustomizing(!isCustomizing)} 
                style={cartItemRowStyles.customizeBtn}
            >
                <Text style={cartItemRowStyles.customizeText}>
                    {isCustomizing ? 'Done' : 'Customize Addons'}
                </Text>
            </Pressable>
        )}

        {isCustomizing && (
          <View style={cartItemRowStyles.addonListContainer}>
            {allAddons.map((addon) => {
              const count = getAddonCount(addon.id);
              return (
                <View key={addon.id} style={cartItemRowStyles.addonRow}>
                  <Text style={cartItemRowStyles.addonName}>{addon.name} ({formatCurrency(addon.price)})</Text>
                  <View style={cartItemRowStyles.addonControls}>
                    <Pressable 
                        onPress={() => handleAddonChange(addon, 'dec')} 
                        style={[cartItemRowStyles.smallBtn, count === 0 && cartItemRowStyles.disabledBtn]}
                        disabled={count === 0}
                    >
                      <Text style={cartItemRowStyles.smallBtnText}>-</Text>
                    </Pressable>
                    <Text style={cartItemRowStyles.addonCount}>{count}</Text>
                    <Pressable onPress={() => handleAddonChange(addon, 'inc')} style={cartItemRowStyles.smallBtn}>
                      <Text style={cartItemRowStyles.smallBtnText}>+</Text>
                    </Pressable>
                    <Pressable onPress={() => handleAddonChange(addon, 'del')} style={cartItemRowStyles.delBtn}>
                      <Text style={cartItemRowStyles.delText}>×</Text>
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </Animated.View>
  );
};