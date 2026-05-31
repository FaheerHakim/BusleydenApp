import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function ProductCard({ product, onPress }) {
  const name = product.fieldData?.name;
  
  // Webflow E-commerce API check: haal de prijs op uit de verschillende mogelijke plekken
  const rawPrice = product.fieldData?.price;
  let price = 0;

  if (rawPrice) {
    if (typeof rawPrice === 'object' && rawPrice.value !== undefined) {
      price = rawPrice.value; // Vaak gebruikt in nieuwere Webflow API's
    } else if (typeof rawPrice === 'object' && rawPrice.amount !== undefined) {
      price = rawPrice.amount / 100; // Soms stuurt Webflow centen (bijv. 1500 i.p.v. 15.00)
    } else if (typeof rawPrice === 'number') {
      price = rawPrice;
    } else {
      price = parseFloat(rawPrice) || 0;
    }
  }

  // Afbeelding check: Webflow gebruikt voor e-commerce 'main-image'
  const imageObj = product.fieldData?.['main-image'];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {imageObj && imageObj.url && (
        <Image source={{ uri: imageObj.url }} style={styles.image} />
      )}
      
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.price}>€ {price.toFixed(2)}</Text>
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
    backgroundColor: '#eaeaea', // Fijne achtergrondkleur als de foto laadt
  },
  infoContainer: {
    padding: 15,
  },
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