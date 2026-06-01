import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Image, ScrollView,
  TouchableOpacity, Switch, Button
} from 'react-native';

export default function ProductDetailsScreen({ route }) {
  const { item } = route.params;

  const fieldData = item.product?.fieldData || {};
  const skuData = item.skus?.[0]?.fieldData || {};

  const name = fieldData.name || 'Product';
  const description = fieldData.description || 'Geen beschrijving beschikbaar.';
  const imageUrl = skuData['main-image']?.url || null;
  const rawPrice = skuData.price?.value || 0;
  const price = rawPrice / 100;

  const [quantity, setQuantity] = useState(1);
  const [isGift, setIsGift] = useState(false);

  const totalPrice = (price * quantity).toFixed(2);

  const increase = () => setQuantity(q => q + 1);
  const decrease = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  return (
    <ScrollView style={styles.container}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>Geen afbeelding</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>€ {price.toFixed(2)}</Text>
        <Text style={styles.description}>{description}</Text>

        {/* Aantal aanpassen */}
        <View style={styles.quantityContainer}>
          <Text style={styles.label}>Aantal:</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity style={styles.qButton} onPress={decrease}>
              <Text style={styles.qButtonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity style={styles.qButton} onPress={increase}>
              <Text style={styles.qButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Cadeau switch */}
        <View style={styles.switchRow}>
          <Text style={styles.label}>Cadeau verpakking</Text>
          <Switch
            value={isGift}
            onValueChange={setIsGift}
            trackColor={{ false: '#dee2e6', true: '#0056b3' }}
            thumbColor={isGift ? '#fff' : '#f4f3f4'}
          />
        </View>
        {isGift && (
          <Text style={styles.giftNote}>🎁 Cadeau verpakking wordt toegevoegd!</Text>
        )}

        {/* Totaalprijs */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Totaal:</Text>
          <Text style={styles.totalPrice}>€ {totalPrice}</Text>
        </View>

        {/* Bestel knop */}
        <Button
          title="Toevoegen aan winkelmandje"
          color="#0056b3"
          onPress={() => alert(`${quantity}x ${name} toegevoegd!`)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 300, resizeMode: 'cover' },
  imagePlaceholder: {
    width: '100%', height: 300,
    backgroundColor: '#e9ecef',
    justifyContent: 'center', alignItems: 'center'
  },
  placeholderText: { color: '#adb5bd', fontSize: 16 },
  content: { padding: 20 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 8 },
  price: { fontSize: 22, fontWeight: '700', color: '#0056b3', marginBottom: 15 },
  description: { fontSize: 15, color: '#555', lineHeight: 22, marginBottom: 25 },
  label: { fontSize: 16, fontWeight: '600', color: '#333' },
  quantityContainer: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 20,
    backgroundColor: '#f8f9fa', padding: 15, borderRadius: 12
  },
  quantityControls: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  qButton: {
    backgroundColor: '#0056b3', width: 36, height: 36,
    borderRadius: 18, justifyContent: 'center', alignItems: 'center'
  },
  qButtonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  quantityText: { fontSize: 20, fontWeight: 'bold', color: '#1a1a1a', minWidth: 30, textAlign: 'center' },
  switchRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 10,
    backgroundColor: '#f8f9fa', padding: 15, borderRadius: 12
  },
  giftNote: { color: '#0056b3', fontSize: 14, marginBottom: 15, textAlign: 'center' },
  totalContainer: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginVertical: 20,
    backgroundColor: '#e8f0fe', padding: 15, borderRadius: 12
  },
  totalLabel: { fontSize: 18, fontWeight: '600', color: '#333' },
  totalPrice: { fontSize: 24, fontWeight: 'bold', color: '#0056b3' },
});