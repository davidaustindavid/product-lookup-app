import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ padding: 10, borderBottomWidth: 1 }}>
        <Text>{product.name}</Text>
        <Text>{product.sku}</Text>
      </View>
    </TouchableOpacity>
  );
}
