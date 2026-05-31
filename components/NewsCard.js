import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function NewsCard({ item, onPress }) {
  const name = item.fieldData?.name;
  
  // Jouw Webflow gebruikt de Nederlandse veldnamen 'afbeelding' en 'datum'
  const imageObj = item.fieldData?.afbeelding;
  const dateValue = item.fieldData?.datum;

  const formattedDate = dateValue 
    ? new Date(dateValue).toLocaleDateString('nl-BE') 
    : '';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {imageObj && imageObj.url && (
        <Image source={{ uri: imageObj.url }} style={styles.image} />
      )}
      
      <View style={styles.infoContainer}>
        {formattedDate ? <Text style={styles.date}>{formattedDate}</Text> : null}
        <Text style={styles.title} numberOfLines={2}>{name}</Text>
        <Text style={styles.moreText}>Lees artikel →</Text>
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
    height: 150,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 15,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
    lineHeight: 22,
  },
  moreText: {
    fontSize: 14,
    color: '#0056b3',
    fontWeight: '600',
  },
});