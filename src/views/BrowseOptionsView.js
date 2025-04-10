// src/views/BrowseOptionsView.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BrowseOptionsView() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Browse the Product Database</Text>
      <View style={styles.buttonContainer}>
        <Button title="Swagelok Interchange Table" onPress={() => navigation.navigate('SwagelokLookup')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Parker Interchange Table" onPress={() => navigation.navigate('ParkerLookup')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 12,
  },
});
