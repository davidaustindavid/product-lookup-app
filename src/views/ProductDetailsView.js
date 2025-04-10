// src/views/ProductDetailsView.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Modal,
  TouchableOpacity,
  Pressable,
  Linking
} from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function ProductDetailsView() {
  const route = useRoute();
  const product = route.params?.product;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageModal = (url) => {
    setSelectedImage(url);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const openPDF = (url) => {
    Linking.openURL(url);
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No product details found.</Text>
      </View>
    );
  }

  const pdfs = product.images?.filter(media => media.url.endsWith('.pdf')) || [];
  const images = product.images?.filter(media => media.url.match(/\.(jpeg|jpg|png|gif)$/)) || [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{product.product_name}</Text>

      {product.brand?.name && (
        <>
          <Text style={styles.label}>Brand:</Text>
          <Text style={styles.value}>{product.brand.name}</Text>
        </>
      )}

      {product.category?.name && (
        <>
          <Text style={styles.label}>Category:</Text>
          <Text style={styles.value}>{product.category.name}</Text>
        </>
      )}

      {product.short_description && (
        <>
          <Text style={styles.label}>Short Description:</Text>
          <Text style={styles.value}>{product.short_description}</Text>
        </>
      )}

      {product.swagelok_part_number && (
        <>
          <Text style={styles.label}>Swagelok Part Number:</Text>
          <Text style={styles.value}>{product.swagelok_part_number}</Text>
        </>
      )}

      {product.parker_part_number && (
        <>
          <Text style={styles.label}>Parker Part Number:</Text>
          <Text style={styles.value}>{product.parker_part_number}</Text>
        </>
      )}

      {product.part_number && (
        <>
          <Text style={styles.label}>Generic Part Number:</Text>
          <Text style={styles.value}>{product.part_number}</Text>
        </>
      )}

      {product.attributes && product.attributes.length > 0 && (
        <>
          <Text style={styles.label}>Specifications:</Text>
          <View style={styles.table}>
            {product.attributes.map(attr => (
              <View key={attr.id} style={styles.row}>
                <Text style={styles.cellLabel}>{attr.name}</Text>
                <Text style={styles.cellValue}>{attr.value}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {images.length > 0 && (
        <>
          <Text style={styles.label}>Product Images:</Text>
          <FlatList
            horizontal
            data={images}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => openImageModal(item.url)}>
                <Image source={{ uri: item.url }} style={styles.image} />
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingVertical: 10 }}
            showsHorizontalScrollIndicator={false}
          />
        </>
      )}

      {pdfs.length > 0 && (
        <>
          <Text style={styles.label}>Product PDFs:</Text>
          {pdfs.map((file) => (
            <TouchableOpacity key={file.id} onPress={() => openPDF(file.url)}>
              <Text style={styles.pdfLink}>View PDF: {file.url.split('/').pop()}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <Pressable style={styles.modalBackground} onPress={closeModal}>
          <View style={styles.modalContainer}>
            {selectedImage && (
              <Image source={{ uri: selectedImage }} style={styles.modalImage} resizeMode="contain" />
            )}
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    marginTop: 4,
  },
  image: {
    width: 200,
    height: 160,
    marginRight: 10,
    borderRadius: 8,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    height: '80%',
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  pdfLink: {
    color: '#007AFF',
    fontSize: 16,
    marginTop: 8,
    textDecorationLine: 'underline',
  },
  table: {
    marginTop: 8,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  cellLabel: {
    fontWeight: '600',
    width: '45%',
  },
  cellValue: {
    width: '50%',
    textAlign: 'right',
  },
});
