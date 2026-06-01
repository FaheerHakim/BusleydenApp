import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

// 🏢 De 8 unieke campussen uit jouw Webflow CMS, elk exact 2 keer
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

  // 🔀 Functie om de game op te starten en de kaarten willekeurig te schudden
  const initializeGame = () => {
    const shuffledCards = [...CAMPUS_PAIRS]
      .map((campusName, index) => ({
        id: index,
        name: campusName,
        isFlipped: false, // Standaard start elke kaart dicht
        isMatched: false  // Standaard is er nog niks geraden
      }))
      .sort(() => Math.random() - 0.5); // Deze truc husselt de lijst door elkaar
    
    setCards(shuffledCards);
    setScore(0);
    setTimeLeft(45);
  };

  // ⏱️ Zodra het scherm voor het eerst laadt, starten we direct de game
  useEffect(() => {
    initializeGame();
  }, []);

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
            onPress={() => console.log('Je klikte op:', card.name)}
          >
            {/* We tonen nog steeds overal een vraagteken totdat we de klik-logica bouwen */}
            <Text style={styles.cardText}>❓</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Herstartknop gekoppeld aan onze nieuwe hussel-functie */}
      <TouchableOpacity style={styles.restartButton} onPress={initializeGame}>
        <Text style={styles.restartButtonText}>🔄 Spel Herstarten</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 15 },
  mainTitle: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginVertical: 15, color: '#1a1a1a' },
  statusRow: { flexDirection: 'row', justifyContext: 'space-between', backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 20, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, justifyContent: 'space-between' },
  statusText: { fontSize: 16, color: '#495057' },
  bold: { fontWeight: 'bold', color: '#0056b3' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  card: { width: '23%', height: 80, backgroundColor: '#0056b3', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 10, elevation: 3 },
  cardText: { fontSize: 24, color: '#fff', fontWeight: 'bold' },
  restartButton: { backgroundColor: '#212529', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 10, marginBottom: 30 },
  restartButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});