import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabaseClient';

export const fetchAndCacheProducts = async () => {
  try {
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw error;

    if (Array.isArray(data) && data.length > 0) {
      await AsyncStorage.setItem('products', JSON.stringify(data));
      console.log(`✅ Cached ${data.length} products from Supabase.`);
    } else {
      console.warn('⚠️ No product data retrieved from Supabase.');
    }
  } catch (err) {
    console.error('❌ Failed to sync with Supabase:', err);
  }
};

export const getCachedProducts = async () => {
  try {
    const cached = await AsyncStorage.getItem('products');
    return cached ? JSON.parse(cached) : [];
  } catch (err) {
    console.error('❌ Error reading local product cache:', err);
    return [];
  }
};
