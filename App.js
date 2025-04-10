import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './src/navigation/AppNavigator';
import ListView from './src/views/ListView';
import ResultsView from './src/views/ResultsView';
import ProductDetailsView from './src/views/ProductDetailsView';
import { fetchAndCacheProducts } from './src/storage/localCache';
import SwagelokLookupView from './src/views/SwagelokLookupView';
import ParkerLookupView from './src/views/ParkerLookupView';
import { Image, Text } from 'react-native';
import Logo from './assets/tgci-white-logo.png'; 

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    fetchAndCacheProducts();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Tabs"
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#32a68b',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        <Stack.Screen
          name="Tabs"
          component={AppNavigator}
          options={{
            title: 'TGCI Interchange Lookup',
            headerLeft: () => (
              <Image
                source={Logo}
                style={{ width: 140, height: 50, marginLeft: -10 }}
                resizeMode= 'contain'
              />
            ),
            headerTitle: () => null, // hide text title when logo is shown
          }}
        />
        <Stack.Screen name="List" component={ListView} options={{ title: 'Product List' }} />
        <Stack.Screen name="Results" component={ResultsView} options={{ title: 'Search Results' }} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsView} options={{ title: 'Product Details' }} />
        <Stack.Screen name="SwagelokLookup" component={SwagelokLookupView} options={{ title: 'Swagelok Lookup' }} />
        <Stack.Screen name="ParkerLookup" component={ParkerLookupView} options={{ title: 'Parker Lookup' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
