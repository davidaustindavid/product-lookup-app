// src/views/ParkerLookupView.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { getCachedProducts } from '../storage/localCache';
import { useNavigation } from '@react-navigation/native';

export default function ParkerLookupView() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const loadProducts = async () => {
      const all = await getCachedProducts();
      const parker = all.filter(p => p.parker_part_number);
      setProducts(parker);
      setFiltered(parker);
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
      p.parker_part_number?.toLowerCase().includes(q)
    );
    setFiltered(results);
  }, [query]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Parker Lookup</Text>
      <TextInput
        placeholder="Search TGCI or Parker part number"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <FlatList
        data={filtered}
        keyExtractor={item => item.id?.toString() || item.part_number || Math.random().toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
          >
            <View style={styles.row}>
              <Text style={styles.cell}>{item.part_number || '-'}</Text>
              <Text style={styles.cell}>{item.parker_part_number || '-'}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListHeaderComponent={() => (
          <View style={[styles.row, styles.headerRow]}>
            <Text style={[styles.cell, styles.headerCell]}>TGCI Part #</Text>
            <Text style={[styles.cell, styles.headerCell]}>Parker Part #</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  cell: {
    flex: 1,
    fontSize: 16,
  },
  headerRow: {
    backgroundColor: '#f6f6f6',
  },
  headerCell: {
    fontWeight: 'bold',
  },
});
