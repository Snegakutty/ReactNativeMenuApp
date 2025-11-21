import React, {useEffect, useRef} from 'react';
import {Modal, Pressable, Animated} from 'react-native';
import {itemDetailModalStyles} from '../styles/components/itemDetailModal.styles';
import {Item, Addon} from '../services/api';
import {useAppDispatch} from '../store';
import {addItem, decrementQuantity, incrementQuantity} from '../store/slices/cartSlice';
import {ModalHeader} from "./ModalHeader";
import {ModalContent} from './ModalContent';

type ItemDetailModalProps = {
  visible: boolean;
  item: Item | null;
  addons: Addon[];
  onClose: () => void;
  navigation: any;
};

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  visible,
  item,
  addons,
  onClose,
  
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {toValue: 1, duration: 300, useNativeDriver: true}),
        Animated.spring(slideAnim, {toValue: 0, tension: 50, friction: 7, useNativeDriver: true}),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
    }
  }, [visible]);

  if (!item) return null;

  
  const handleInitialAdd = (selectedAddons: Addon[]) => {
    dispatch(addItem({
      id: item.id, 
      name: item.name, 
      price: item.price, 
      quantity: 1, 
      selectedAddons
    }));
   
  };

  
  const handleIncrement = () => {
    dispatch(incrementQuantity(item.id));
  };

 
  const handleDecrement = () => {
    dispatch(decrementQuantity(item.id));
  };

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Pressable style={itemDetailModalStyles.overlay} onPress={onClose}>
        <Animated.View style={[itemDetailModalStyles.modal, {opacity: fadeAnim, transform: [{translateY: slideAnim}]}]}>
          <Pressable onPress={e => e.stopPropagation()}>
            <ModalHeader item={item} onClose={onClose} />
            <ModalContent 
              item={item} 
              addons={addons} 
              onInitialAdd={handleInitialAdd}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};