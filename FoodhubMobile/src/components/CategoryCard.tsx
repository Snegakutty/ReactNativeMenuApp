import React from 'react';
import {Pressable, Text, ViewStyle} from 'react-native';
import {categoryCardStyles} from '../styles/components/categoryCard.styles';

type CategoryCardProps = {
  name: string;
  onPress: () => void;
  isActive?: boolean;
  style?: ViewStyle;
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  onPress,
  isActive = false,
  style,
}) => {
  return (
    <Pressable
      style={({pressed}) => [
        categoryCardStyles.container,
        isActive && categoryCardStyles.active,
        pressed && categoryCardStyles.pressed,
        style,
      ]}
      onPress={onPress}>
      <Text
        style={[
          categoryCardStyles.text,
          isActive && categoryCardStyles.activeText,
        ]}>
        {name}
      </Text>
    </Pressable>
  );
};

