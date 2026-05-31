import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function ProductCard({ product, onPress }) {
  // We halen handmatig de juiste velden op uit fieldData
  const name = product.fieldData?.name;
  
  // Webflow E-commerce zet de prijs vaak in 'price' of 'price' object. 
  // We vangen beide mogelijkheden op:
  const priceValue = product.fieldData?.price?.value || product.fieldData?.price;
  const price = typeof priceValue === 'number' ? priceValue : parseFloat(priceValue) || 0;

  // De afbeelding heet 'main-image' in jouw Webflow
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