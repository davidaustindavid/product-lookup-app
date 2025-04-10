// src/views/SearchView.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import SearchBar from '../components/SearchBar';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { supabase } from '../lib/supabaseClient';
import { getCachedProducts } from '../storage/localCache';

export default function SearchView() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const loadCached = async () => {
      const cached = await getCachedProducts();
      setProducts(cached);
    };
    loadCached();
  }, []);

  const runSearch = async () => {
    if (query.trim() === '') {
      setFiltered([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    setLoading(true);

    const net = await NetInfo.fetch();
    if (net.isConnected) {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .or(`part_number.ilike.%${query}%,swagelok_part_number.ilike.%${query}%,parker_part_number.ilike.%${query}%`);

        if (error) throw error;

        if (data && data.length > 0) {
          setFiltered(data);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Supabase search failed, falling back to local.', err);
      }
    }

    const localResults = products.filter(p =>
      p.part_number?.toLowerCase().includes(lowerQuery) ||
      p.swagelok_part_number?.toLowerCase().includes(lowerQuery) ||
      p.parker_part_number?.toLowerCase().includes(lowerQuery)
    );
    setFiltered(localResults);
    setLoading(false);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim()) runSearch();
    }, 300);
    return () => clearTimeout(delay);
  }, [query]);

  const getMatchLabel = (product) => {
    const q = query.toLowerCase();
    if (product.swagelok_part_number?.toLowerCase().includes(q)) return 'Swagelok';
    if (product.parker_part_number?.toLowerCase().includes(q)) return 'Parker';
    if (product.part_number?.toLowerCase().includes(q)) return 'TGCI';
    return 'Product';
  };

  const getMatchValue = (product) => {
    const q = query.toLowerCase();
    if (product.swagelok_part_number?.toLowerCase().includes(q)) return product.swagelok_part_number;
    if (product.parker_part_number?.toLowerCase().includes(q)) return product.parker_part_number;
    if (product.part_number?.toLowerCase().includes(q)) return product.part_number;
    return product.product_name;
  };

  const goToResults = () => {
    navigation.navigate('Results', { results: filtered });
  };

  const clearSearch = () => {
    setQuery('');
    setFiltered([]);
  };

  const goToBrowseOptions = () => {
    navigation.navigate('Browse');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <Text style={styles.heading}>Search Products</Text>
      <SearchBar value={query} onChange={setQuery} />

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
      ) : (
        filtered.length > 0 && (
          <FlatList
            data={filtered.slice(0, 10)}
            keyExtractor={item => item.id?.toString() || item.sku}
            renderItem={({ item }) => {
              const label = getMatchLabel(item);
              const value = getMatchValue(item);
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('ProductDetails', { product: item })}
                  style={styles.resultItem}
                >
                  <Text style={styles.resultText}>{value}</Text>
                  <Text style={styles.resultLabel}>{label}</Text>
                </TouchableOpacity>
              );
            }}
          />
        )
      )}

      <View style={styles.buttonRow}>
        <Button title="View All Results" onPress={goToResults} disabled={filtered.length === 0 || loading} />
        <Button title="Clear" onPress={clearSearch} color="#FF3B30" />
      </View>

      <TouchableOpacity onPress={goToBrowseOptions} style={styles.linkWrapper}>
        <Text style={styles.linkText}>Or Browse the Database</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  resultItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  resultText: {
    fontSize: 18,
    fontWeight: '500',
  },
  resultLabel: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  buttonRow: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  linkWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});
