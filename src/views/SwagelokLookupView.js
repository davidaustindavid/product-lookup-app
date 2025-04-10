// src/views/SwagelokLookupView.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { getCachedProducts } from '../storage/localCache';
import { useNavigation } from '@react-navigation/native';

export default function SwagelokLookupView() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const loadProducts = async () => {
      const all = await getCachedProducts();
      const swagelok = all.filter(p => p.swagelok_part_number);
      setProducts(swagelok);
      setFiltered(swagelok);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setFiltered(products);
      return;
    }
    const q = query.toLowerCase();
    const results = products.filter(p =>
      p.part_number?.toLowerCase().includes(q) ||
      p.swagelok_part_number?.toLowerCase().includes(q)
    );
    setFiltered(results);
  }, [query]);

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-center mb-4 text-gray-800">
        Swagelok Lookup
      </Text>
      <TextInput
        placeholder="Search TGCI or Swagelok part number"
        value={query}
        onChangeText={setQuery}
        className="border border-gray-300 rounded-md px-4 py-2 mb-4"
      />

      <FlatList
        data={filtered}
        keyExtractor={item => item.id?.toString() || item.part_number || Math.random().toString()}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={() => (
          <View className="flex-row bg-gray-100 py-2 border-b border-gray-200">
            <Text className="flex-1 font-bold text-sm text-gray-700 px-1">TGCI Part #</Text>
            <Text className="flex-1 font-bold text-sm text-gray-700 px-1">Swagelok Part #</Text>
          </View>
        )}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
          >
            <View className={`flex-row py-2 border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
              <Text className="flex-1 text-gray-800 px-1">{item.part_number || '-'}</Text>
              <Text className="flex-1 text-gray-800 px-1">{item.swagelok_part_number || '-'}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
