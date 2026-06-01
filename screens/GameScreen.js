import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

const CAMPUS_PAIRS = [
  'BA Zandpoort', 'BA Zandpoort',
  'BA Stassart', 'BA Stassart',
  'BA Pitzemburg', 'BA Pitzemburg',
  'BA Nekkerspoel', 'BA Nekkerspoel',
  'BA Basisverpleegkunde', 'BA Basisverpleegkunde',
  'BA De Beemden', 'BA De Beemden',
  'BA Caputsteen', 'BA Caputsteen',
  'BA Botaniek', 'BA Botaniek'
];

export default function GameScreen({ navigation }) {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);

  const initializeGame = () => {
    const shuffledCards = [...CAMPUS_PAIRS]
      .map((campusName, index) => ({
        id: index,
        name: campusName,
        isFlipped: false,
        isMatched: false
      }))
      .sort(() => Math.random() - 0.5);
    
    setCards(shuffledCards);
    setScore(0);
    setTimeLeft(45);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  // ── 🛠️ JOUW NIEUWE KLIK-FUNCTIE ──
  const handleCardPress = (clickedId) => {
    const updatedCards = cards.map((card) => {
      // Als dit de kaart is waarop geklikt is, zetten we hem open (isFlipped: true)
      if (card.id === clickedId) {
        return { ...card, isFlipped: true };
      }
      return card; // De rest van de kaarten laten we zo
    });

    setCards(updatedCards);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>🏫 Campus Memory</Text>

      <View style={styles.statusRow}>
        <Text style={styles.statusText}>⏱️ Tijd: <Text style={styles.bold}>{timeLeft}s</Text></Text>
        <Text style={styles.statusText}>🏆 Score: <Text style={styles.bold}>{score}</Text></Text>
      </View>

      <View style={styles.grid}>
        {cards.map((card) => (
          <TouchableOpacity 
            key={card.id} 
            // 💡 Als card.isFlipped true is, voegen we extra styling toe (styles.cardFlipped)
            style={[styles.card, card.isFlipped && styles.cardFlipped]}
            activeOpacity={0.7}
            // We roepen nu de nieuwe handleCardPress functie aan met het ID van de kaart
            onPress={() => handleCardPress(card.id)}
          >
            {/* 💡 Als de kaart open is tonen we de naam (zonder 'BA ' zodat het past), anders een ❓ */}
            <Text style={[styles.cardText, card.isFlipped && styles.cardTextFlipped]}>
              {card.isFlipped ? card.name.replace('BA ', '') : '❓'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.restartButton} onPress={initializeGame}>
        <Text style={styles.restartButtonText}>🔄 Spel Herstarten</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 15 },
  mainTitle: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginVertical: 15, color: '#1a1a1a' },
  statusRow: { flexDirection: 'row', backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 20, elevation: 2, justifyContent: 'space-between' },
  statusText: { fontSize: 16, color: '#495057' },
  bold: { fontWeight: 'bold', color: '#0056b3' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  
  // Standaard dichte blauwe kaart
  card: { 
    width: '23%', 
    height: 80, 
    backgroundColor: '#0056b3', 
    borderRadius: 8, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 10, 
    elevation: 3,
    borderWidth: 1,
    borderColor: '#004394'
  },
  cardText: { fontSize: 24, color: '#fff', fontWeight: 'bold' },
  
  // ✅ STYLING ALS DE KAART OPEN IS (Wit met blauwe letters)
  cardFlipped: {
    backgroundColor: '#fff',
    borderColor: '#0056b3',
  },
  cardTextFlipped: {
    fontSize: 9, // Lekker klein zodat lange namen zoals 'Basisverpleegkunde' netjes op het kaartje passen!
    color: '#0056b3',
    textAlign: 'center',
    paddingHorizontal: 2,
    fontWeight: 'bold',
  },
  
  restartButton: { backgroundColor: '#212529', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 10, marginBottom: 30 },
  restartButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});