import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function ProductCard({ product, onPress }) {
  const name = product.fieldData?.name || "Busleyden Product";
  
  // Omdat Webflow E-commerce prijzen en afbeeldingen in de SKU's stopt, 
  // bouwen we hier een slimme check met een logische fallback voor je demo!
  
  // 1. Probeer de prijs te pakken, anders geven we een mooie standaardprijs
  const rawPrice = product.fieldData?.price;
  let price = 15.00; // Standaardprijs voor de studentenshop mocht Webflow leeg zijn

  if (rawPrice) {
    if (typeof rawPrice === 'object') {
      price = rawPrice.value !== undefined ? rawPrice.value : (rawPrice.amount ? rawPrice.amount / 100 : 15.00);
    } else if (typeof rawPrice === 'number') {
      price = rawPrice;
    }
  }

  // 2. Probeer de afbeelding te pakken uit alle mogelijke Webflow-hoeken
  const imageObj = product.fieldData?.['main-image'] || product.fieldData?.image || product.fieldData?.afbeelding;
  
  // We gebruiken een mooie, relevante placeholder-afbeelding van internet mocht Webflow de foto verbergen in de SKU
  const imageUrl = imageObj && imageObj.url 
    ? imageObj.url 
    : 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500'; // Nette universele kleding/merch placeholder

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      
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
    backgroundColor: '#eaeaea',
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