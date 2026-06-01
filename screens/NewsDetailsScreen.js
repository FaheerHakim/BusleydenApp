import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

export default function NewsDetailsScreen({ route }) {
  const { item } = route.params;

  const name = item.fieldData?.name || 'Artikel';
  const imageObj = item.fieldData?.afbeelding;
  const intro = item.fieldData?.intro;

  // 1. Haal de ruwe HTML-inhoud op uit Webflow
  const ruweInhoud = item.fieldData?.['inhoud'] || '';
  
  // 2. HTML-tags wegpoetsen zodat het schone tekst wordt
  const inhoud = ruweInhoud.replace(/<[^>]*>/g, '');

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
        {/* Volgorde 1: Datum */}
        {formattedDate ? (
          <Text style={styles.date}>{formattedDate}</Text>
        ) : null}

        {/* Volgorde 2: Naam (Titel) — Die ontbrak nog in jouw weergave! */}
        <Text style={styles.title}>{name}</Text>

        {/* Volgorde 3: Intro */}
        {intro ? (
          <Text style={styles.introText}>{intro}</Text>
        ) : null}

        {/* Volgorde 4: Inhoud (schoongemaakt) */}
        {inhoud ? (
          <Text style={styles.body}>{inhoud}</Text>
        ) : null}
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
  title: { 
    fontSize: 24, // Iets groter gemaakt omdat het de hoofdtitel is
    fontWeight: 'bold', 
    color: '#1a1a1a',
    marginBottom: 15,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  introText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600', // Dikker gemaakt zodat het echt als een introductie oogt
    lineHeight: 24,
    marginBottom: 15,
  },
  body: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
  },
});