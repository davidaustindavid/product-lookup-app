import React from 'react';
import { View, Text } from 'react-native';

export default function TailwindTest() {
  return (
    <View className="flex-1 items-center justify-center bg-green-100">
      <Text className="text-2xl font-bold text-green-800">✅ Tailwind is working!</Text>
    </View>
  );
}
