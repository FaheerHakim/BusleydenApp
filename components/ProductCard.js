import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function ProductCard({ product, onPress }) {
const fieldData = product.product?.fieldData || {};
  
  // Naam
  const name = fieldData.name || 'Busleyden Product';

  // Afbeelding — Webflow E-commerce: fieldData["main-image"]
  const imageUrl = fieldData['main-image']?.url || null;

  // Prijs — zit in product.skus[0].fieldData.price.value (in centen!)
  const rawPrice = product.skus?.[0]?.fieldData?.price?.value;
  const price = rawPrice != null ? (rawPrice / 100).toFixed(2) : null;

  // Categorie (optioneel, voor later)
  const category = fieldData.category || null;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]}>
          <Text style={styles.placeholderText}>Geen afbeelding</Text>
        </View>
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>{name}</Text>
        {price ? (
          <Text style={styles.price}>€ {price}</Text>
        ) : (
          <Text style={styles.price}>Prijs onbekend</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#adb5bd',
    fontSize: 14,
  },
  infoContainer: { padding: 15 },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0056b3',
  },
});