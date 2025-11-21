import React from 'react';
import { Text, View } from 'react-native';
import { itemDetailModalStyles } from '../styles/components/itemDetailModal.styles';
import { Addon } from '../services/api';
import { formatCurrency } from '../utils/formatCurrency';

type AddonSelectorProps = {
  addons: Addon[];
  // Removed selectedAddons and setSelectedAddons as they are no longer needed for display only
};

export const AddonSelector: React.FC<AddonSelectorProps> = ({
  addons,
}) => {
  return (
    <View style={itemDetailModalStyles.section}>
      <Text style={itemDetailModalStyles.sectionTitle}>Available Addons</Text>
      {addons.length > 0 ? (
        <View style={itemDetailModalStyles.addonsList}>
          {addons.map(addon => {
            return (
              <View
                key={addon.id}
               
                style={itemDetailModalStyles.addonItem}
              >
                <Text style={itemDetailModalStyles.addonName}>
                  {addon.name}
                </Text>
                <Text style={itemDetailModalStyles.addonPrice}>
                  +{formatCurrency(addon.price)}
                </Text>
              </View>
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