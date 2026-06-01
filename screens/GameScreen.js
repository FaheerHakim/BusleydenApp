import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GameScreen from './screens/GameScreen';

export default function GameScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏫 Welkom bij de Campus Memory Game!</Text>
      <Text style={styles.subtitle}>Hier komt straks ons speelveld.</Text>
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
  },
});