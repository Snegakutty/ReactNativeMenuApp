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
  onAddToCart: (quantity: number, selectedAddons: Addon[]) => void;
};

export const ModalContent: React.FC<ModalContentProps> = ({
  item,
  addons,
  onAddToCart,
}) => {
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);

  useEffect(() => {
    setShowQuantitySelector(false);
    setQuantity(1);
    setSelectedAddons([]);
  }, [item]);

  return (
    <ScrollView style={itemDetailModalStyles.content}>
      <ItemDetails item={item} />

      <AddonSelector
        addons={addons}
        selectedAddons={selectedAddons}
        setSelectedAddons={setSelectedAddons}
      />

      {!showQuantitySelector && (
        <Pressable
          style={itemDetailModalStyles.addItemButton}
          onPress={() => {
            onAddToCart(1, selectedAddons);
          }}
        >
          <Text style={itemDetailModalStyles.addItemText}>Add Item</Text>
        </Pressable>
      )}

      {showQuantitySelector && (
        <QuantitySelector
          quantity={quantity}
          setQuantity={setQuantity}
          onAddToCart={() => onAddToCart(quantity, selectedAddons)}
        />
      )}
    </ScrollView>
  );
};
