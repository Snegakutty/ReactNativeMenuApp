import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { itemDetailModalStyles } from '../styles/components/itemDetailModal.styles';
import { Item } from '../services/api';

type ModalHeaderProps = {
  item: Item;
  onClose: () => void;
};

export const ModalHeader: React.FC<ModalHeaderProps> = ({ item, onClose }) => {
  return (
    <View style={itemDetailModalStyles.header}>
      <Text style={itemDetailModalStyles.title}>{item.name}</Text>
      <Pressable onPress={onClose} style={itemDetailModalStyles.closeButton}>
        <Text style={itemDetailModalStyles.closeText}>×</Text>
      </Pressable>
    </View>
  );
};
