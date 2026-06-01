import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default function GameScreen({ navigation }) {
  // We maken handmatig een simpele lijst van 16 kaarten met een id van 1 tot 16
  const [cards, setCards] = useState([
    { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 },
    { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 },
    { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 },
    { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }
  ]);
  
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>🏫 Campus Memory</Text>

      {/* Spel status balk */}
      <View style={styles.statusRow}>
        <Text style={styles.statusText}>⏱️ Tijd: <Text style={styles.bold}>{timeLeft}s</Text></Text>
        <Text style={styles.statusText}>🏆 Score: <Text style={styles.bold}>{score}</Text></Text>
      </View>

      {/* Het Grid met de 16 kaarten */}
      <View style={styles.grid}>
        {cards.map((card) => (
          <TouchableOpacity 
            key={card.id} 
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => console.log('Klik op kaart:', card.id)}
          >
            <Text style={styles.cardText}>❓</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Herstartknop */}
      <TouchableOpacity style={styles.restartButton}>
        <Text style={styles.restartButtonText}>🔄 Spel Herstarten</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 15 },
  mainTitle: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginVertical: 15, color: '#1a1a1a' },
  statusRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 20,
    elevation: 2,
  },
  statusText: { fontSize: 16, color: '#495057' },
  bold: { fontWeight: 'bold', color: '#0056b3' },
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    marginBottom: 20 
  },
  card: { 
    width: '23%', 
    height: 80, 
    backgroundColor: '#0056b3', 
    borderRadius: 8, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 10,
    elevation: 3,
  },
  cardText: { fontSize: 24, color: '#fff', fontWeight: 'bold' },
  restartButton: { 
    backgroundColor: '#212529', 
    paddingVertical: 14, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 10, 
    marginBottom: 30 
  },
  restartButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});