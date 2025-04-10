import React from 'react';
import { View, TextInput } from 'react-native';

export default function SearchBar({ value, onChange }) {
  return (
    <View>
      <TextInput
        placeholder="Search by part number (Swagelok, Parker, or TGCI)"
        value={value}
        onChangeText={onChange}
        style={{ borderBottomWidth: 1, padding: 8 }}
      />
    </View>
  );
}
