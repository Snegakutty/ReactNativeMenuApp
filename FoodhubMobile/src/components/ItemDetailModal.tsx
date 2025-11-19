import React, {useEffect, useRef} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
  Animated,
} from 'react-native';
import {itemDetailModalStyles} from '../styles/components/itemDetailModal.styles';
import {Item, Addon} from '../services/api';
import {formatCurrency} from '../utils/formatCurrency';

type ItemDetailModalProps = {
  visible: boolean;
  item: Item | null;
  addons: Addon[];
  onClose: () => void;
};

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  visible,
  item,
  addons,
  onClose,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
    }
  }, [visible, fadeAnim, slideAnim]);

  if (!item) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}>
      <Pressable
        style={itemDetailModalStyles.overlay}
        onPress={onClose}>
        <Animated.View
          style={[
            itemDetailModalStyles.modal,
            {
              opacity: fadeAnim,
              transform: [{translateY: slideAnim}],
            },
          ]}>
          <Pressable onPress={e => e.stopPropagation()}>
            <View style={itemDetailModalStyles.header}>
              <Text style={itemDetailModalStyles.title}>{item.name}</Text>
              <Pressable onPress={onClose} style={itemDetailModalStyles.closeButton}>
                <Text style={itemDetailModalStyles.closeText}>×</Text>
              </Pressable>
            </View>

            <ScrollView style={itemDetailModalStyles.content}>
              <Text style={itemDetailModalStyles.price}>
                {formatCurrency(item.price)}
              </Text>

              <View style={itemDetailModalStyles.section}>
                <Text style={itemDetailModalStyles.sectionTitle}>Details</Text>
                <View style={itemDetailModalStyles.tags}>
                  {item.veg_type && (
                    <Text style={itemDetailModalStyles.tag}>
                      {item.veg_type.toUpperCase()}
                    </Text>
                  )}
                  {item.is_bestseller && (
                    <Text style={itemDetailModalStyles.tag}>⭐ Bestseller</Text>
                  )}
                  {item.size && (
                    <Text style={itemDetailModalStyles.tag}>
                      Size: {item.size}
                    </Text>
                  )}
                  {item.prep_time_mins && (
                    <Text style={itemDetailModalStyles.tag}>
                      Prep: {item.prep_time_mins} mins
                    </Text>
                  )}
                </View>
              </View>

              <View style={itemDetailModalStyles.section}>
                <Text style={itemDetailModalStyles.sectionTitle}>Addons</Text>
                {addons.length > 0 ? (
                  <View style={itemDetailModalStyles.addonsList}>
                    {addons.map(addon => (
                      <View key={addon.id} style={itemDetailModalStyles.addonItem}>
                        <Text style={itemDetailModalStyles.addonName}>
                          {addon.name}
                        </Text>
                        <Text style={itemDetailModalStyles.addonPrice}>
                          +{formatCurrency(addon.price)}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text style={itemDetailModalStyles.noAddons}>
                    No addons available
                  </Text>
                )}
              </View>
            </ScrollView>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

