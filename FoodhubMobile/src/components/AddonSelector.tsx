import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { itemDetailModalStyles } from '../styles/components/itemDetailModal.styles';
import { Addon } from '../services/api';
import { formatCurrency } from '../utils/formatCurrency';

type AddonSelectorProps = {
  addons: Addon[];
  selectedAddons: Addon[];
  setSelectedAddons: (addons: Addon[]) => void;
};

export const AddonSelector: React.FC<AddonSelectorProps> = ({
  addons,
  selectedAddons,
  setSelectedAddons,
}) => {
  return (
    <View style={itemDetailModalStyles.section}>
      <Text style={itemDetailModalStyles.sectionTitle}>Addons</Text>
      {addons.length > 0 ? (
        <View style={itemDetailModalStyles.addonsList}>
          {addons.map(addon => {
            const isSelected = selectedAddons.some(selected => selected.id === addon.id);
            return (
              <Pressable
                key={addon.id}
                style={isSelected ? itemDetailModalStyles.selectedAddonItem : itemDetailModalStyles.addonItem}
                onPress={() => {
                  if (isSelected) {
                    setSelectedAddons(selectedAddons.filter(selected => selected.id !== addon.id));
                  } else {
                    setSelectedAddons([...selectedAddons, addon]);
                  }
                }}
              >
                <Text style={isSelected ? itemDetailModalStyles.selectedAddonName : itemDetailModalStyles.addonName}>
                  {addon.name}
                </Text>
                <Text style={isSelected ? itemDetailModalStyles.selectedAddonPrice : itemDetailModalStyles.addonPrice}>
                  +{formatCurrency(addon.price)}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ) : (
        <Text style={itemDetailModalStyles.noAddons}>
          No addons available
        </Text>
      )}
    </View>
  );
};
