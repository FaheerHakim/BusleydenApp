import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function ProductCard({ product, onPress }) {
  const name = product.fieldData?.name || "Busleyden Product";
  const slug = product.fieldData?.slug;
  
  let price = 0;
  let imageUrl = null;

  // Pas hier de prijzen en afbeeldingen aan op basis van de slugs uit je Webflow!
  if (slug === 'ba-sweater-met-kap-maat-m') {
    price = 35.00;
    imageUrl = 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500'; 
  } else if (slug === 'ba-lippenbalsem') {
    price = 2.50;
    imageUrl = 'https://images.unsplash.com/photo-1617421753170-07bf27762df2?w=500';
  } else {
    // Standaardwaarden voor producten die je nog niet hebt toegevoegd in de if-lijst
    price = 4.99;
    imageUrl = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500';
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      
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