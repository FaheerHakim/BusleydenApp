import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

export default function NewsDetailsScreen({ route }) {
  const { item } = route.params;

  const name = item.fieldData?.name || 'Artikel';
  const imageObj = item.fieldData?.afbeelding;

  const dateValue = item.fieldData?.datum;
  const formattedDate = dateValue
  ? new Date(dateValue).toLocaleDateString('nl-BE')
  : '';

  return (
    <ScrollView style={styles.container}>
      {imageObj?.url ? (
        <Image source={{ uri: imageObj.url }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>Geen afbeelding</Text>
        </View>
      )}

      <View style={styles.content}>
        {formattedDate ? (
      <Text style={styles.date}>{formattedDate}</Text>
         ) : null}
        <Text style={styles.title}>{name}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 250, resizeMode: 'cover' },
  imagePlaceholder: {
    width: '100%', height: 250,
    backgroundColor: '#e9ecef',
    justifyContent: 'center', alignItems: 'center'
  },
  placeholderText: { color: '#adb5bd', fontSize: 16 },
  content: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1a1a1a' 
    
  },
  date: {
  fontSize: 12,
  color: '#666',
  marginBottom: 8,
  textTransform: 'uppercase',
  fontWeight: '600',
},
});