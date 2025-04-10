// src/views/ResultsView.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ProductCard from '../components/ProductCard';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ResultsView() {
  const navigation = useNavigation();
  const route = useRoute();
  const results = route.params?.results || [];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search Results ({results.length})</Text>
      {results.length === 0 ? (
        <Text style={styles.noResults}>No results found.</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => item.id?.toString() || item.sku}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('ProductDetails', { product: item })}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  noResults: { fontSize: 16, color: 'gray', marginTop: 20 },
});
