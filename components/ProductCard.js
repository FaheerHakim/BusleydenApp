import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function ProductCard({ product, onPress }) {
  const name = product.fieldData?.name || "Busleyden Product";
  
  // --- DE ECHTE PRIJS FIX ---
  // Webflow v2 API bewaart de prijs van e-commerce items vaak in een 'variants' of 'skus' array,
  // of direct in 'price' als een genest object. Laten we overal zoeken:
  const priceData = product.fieldData?.price || product.fieldData?.['retail-price'];
  let price = 0;

  if (priceData) {
    if (typeof priceData === 'object') {
      price = priceData.value !== undefined ? priceData.value : (priceData.amount ? priceData.amount / 100 : 0);
    } else {
      price = parseFloat(priceData) || 0;
    }
  }

  // --- DE ECHTE AFBEELDING FIX ---
  // In Webflow E-commerce zit de foto vaak in 'main-image' óf in de gallery.
  // We proberen alle mogelijke Webflow veldnamen te mappen:
  const imageObj = product.fieldData?.['main-image'] || 
                   product.fieldData?.image || 
                   product.fieldData?.afbeelding ||
                   product.fieldData?.thumbnail;
  
  const imageUrl = imageObj && imageObj.url ? imageObj.url : null;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        // Mocht Webflow het écht nergens meegeven, tonen we een strakke, neutrale gekleurde box
        // in plaats van die onbekende man van Unsplash!
        <View style={[styles.image, styles.placeholderBox]}>
          <Text style={styles.placeholderText}>🛍️ {name}</Text>
        </View>
      )}
      
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.price}>
          {price > 0 ? `€ ${price.toFixed(2)}` : "Prijs op aanvraag"}
        </Text>
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
  placeholderBox: {
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  placeholderText: {
    color: '#495057',
    fontWeight: '600',
    fontSize: 16,
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