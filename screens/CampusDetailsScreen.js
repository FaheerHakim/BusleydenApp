import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export default function CampusDetails({ route, navigation }) {
  // 1. Vang de meegestuurde campusdata op
  const { item } = route.params || {};
  
  const name = item?.fieldData?.name || 'Onbekende Campus';
  const beschrijving = item?.fieldData?.['beschrijving'] || 'Geen beschrijving beschikbaar voor deze campus.';
  
  // 2. Jouw dynamische kleur! We pakken weer de kleur uit Webflow, met dezelfde blauwe back-up
  const campusKleur = item?.fieldData?.kleur || '#0056b3';

  return (
    <ScrollView style={styles.container}>
      {/* Een mooie gekleurde header-balk die de unieke campuskleur gebruikt */}
      <View style={[styles.headerVisual, { backgroundColor: campusKleur }]} />

      <View style={styles.content}>
        {/* De campusnaam in de juiste kleur */}
        <Text style={[styles.title, { color: campusKleur }]}>{name}</Text>
        
        <Text style={styles.description}>{beschrijving}</Text>

        {/* Een strakke knop om weer terug te gaan naar de homepagina */}
        <TouchableOpacity 
          style={[styles.backButton, { borderColor: campusKleur }]} 
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backButtonText, { color: campusKleur }]}>← Terug naar overzicht</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerVisual: {
    height: 60, // Een fijne gekleurde accentbalk bovenaan het scherm
    width: '100%',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#495057',
    marginBottom: 30,
  },
  backButton: {
    borderWidth: 2,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});