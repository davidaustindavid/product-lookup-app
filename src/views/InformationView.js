// src/views/InformationView.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function InformationView() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>About This App</Text>

      <Text style={styles.paragraph}>
        This app is designed to help users quickly search and cross-reference TGCI part numbers with Swagelok and Parker equivalents.
      </Text>

      <Text style={styles.subheading}>How to Use</Text>
      <Text style={styles.paragraph}>
        • Use the Home tab to search by part number.
        {'\n'}• Use the Browse tab to explore Swagelok or Parker lookup tables.
        {'\n'}• Tap any result to view full product details.
      </Text>

      <Text style={styles.subheading}>Contact Us</Text>
      <Text style={styles.paragraph}>
        For support, questions, or product inquiries, contact us at:
        {'\n'}Email: support@tgci-app.com
        {'\n'}Phone: (123) 456-7890
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
  },
});
