// src/views/FilterView.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Picker, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getCachedProducts } from '../storage/localCache';

export default function FilterView() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const loadFilters = async () => {
      const cached = await getCachedProducts();
      setProducts(cached);

      const uniqueBrands = [...new Set(cached.map(p => p.brand?.name).filter(Boolean))];
      const uniqueCategories = [...new Set(cached.map(p => p.category?.name).filter(Boolean))];

      setBrands(uniqueBrands);
      setCategories(uniqueCategories);
    };
    loadFilters();
  }, []);

  const applyFilters = () => {
    const filtered = products.filter(p => {
      const brandMatch = selectedBrand ? p.brand?.name === selectedBrand : true;
      const categoryMatch = selectedCategory ? p.category?.name === selectedCategory : true;
      return brandMatch && categoryMatch;
    });

    navigation.navigate('Results', { results: filtered });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Filter Products</Text>

      <Text style={styles.label}>Brand:</Text>
      <Picker
        selectedValue={selectedBrand}
        onValueChange={(itemValue) => setSelectedBrand(itemValue)}>
        <Picker.Item label="All Brands" value="" />
        {brands.map((b, i) => (
          <Picker.Item key={i} label={b} value={b} />
        ))}
      </Picker>

      <Text style={styles.label}>Category:</Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}>
        <Picker.Item label="All Categories" value="" />
        {categories.map((c, i) => (
          <Picker.Item key={i} label={c} value={c} />
        ))}
      </Picker>

      <View style={styles.buttonContainer}>
        <Button title="Apply Filters" onPress={applyFilters} />
      </View>
    </View>
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
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
  },
  buttonContainer: {
    marginTop: 24,
  },
});
