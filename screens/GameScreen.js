import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function GameScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>🏫 Campus Memory</Text>
      <Text style={styles.subtitle}>Hier komt straks onze 4x4 grid van kaarten!</Text>

      {/* Een simpele terugknop om te testen of de navigatie soepel werkt */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Terug naar Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: '#212529',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});