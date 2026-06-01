import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function CampusCard({ item, onPress }) {
  const name = item.fieldData?.name || 'Campus';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoContainer: { padding: 15 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
});