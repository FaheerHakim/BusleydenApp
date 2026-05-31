import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function NewsDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nieuws Details Scherm</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold' }
});