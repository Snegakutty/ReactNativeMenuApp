import React, { useEffect, useState } from 'react';
import { ScrollView, Pressable, Text } from 'react-native';
import { itemDetailModalStyles } from '../styles/components/itemDetailModal.styles';
import { Item, Addon } from '../services/api';
import { ItemDetails } from './ItemDetails';
import { AddonSelector } from './AddonSelector';
import { QuantitySelector } from './QuantitySelector';

type ModalContentProps = {
  item: Item;
  addons: Addon[];
  onInitialAdd: (selectedAddons: Addon[]) => void;
  onIncrement: () => void;
  onDecrement: () => void;
};

export const ModalContent: React.FC<ModalContentProps> = ({
  item,
  addons,
  onInitialAdd,
  onIncrement,
  onDecrement,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  
  useEffect(() => {
    setIsAdded(false);
    setQuantity(1);
  }, [item]);

  const handleAddPress = () => {
    setIsAdded(true);
    onInitialAdd([]); 
  };

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
    onIncrement();
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
      onDecrement();
    } else {
      setIsAdded(false);
      onDecrement(); 
    }
  };

  return (
    <ScrollView style={itemDetailModalStyles.content}>
      <ItemDetails item={item} />

      <AddonSelector
        addons={addons}
      />

      {!isAdded ? (
        <Pressable
          style={itemDetailModalStyles.addItemButton}
          onPress={handleAddPress}
        >
          <Text style={itemDetailModalStyles.addItemText}>Add Item</Text>
        </Pressable>
      ) : (
        <QuantitySelector
          quantity={quantity}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />
      )}
    </ScrollView>
  );
};