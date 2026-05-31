import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

// We vangen 'product' en 'onPress' op via props
export default function ProductCard({ product, onPress }) {
  // Haal de gegevens veilig uit de Webflow-structuur (fieldData)
  const { name, price, image } = product.fieldData;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* Als er een afbeelding is vanuit Webflow, tonen we deze */}
      {image && image.url && (
        <Image source={{ uri: image.url }} style={styles.image} />
      )}
      
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        {/* We tonen de prijs netjes geformatteerd */}
        <Text style={styles.price}>€ {price ? price.toFixed(2) : '0.00'}</Text>
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
    // Dit zorgt voor een mooie schaduw op Android (elevation) en iOS
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
    color: '#0056b3', // Mooie blauwe kleur voor de prijs
  },
});