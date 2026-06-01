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
  
  // 🧠 NIEUW: Houdt de ID's bij van de kaarten die op dit moment worden omgedraaid (maximaal 2)
  const [selectedCards, setSelectedCards] = useState([]);

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
    setSelectedCards([]); // Reset ook de geselecteerde kaarten bij herstart
  };

  useEffect(() => {
    initializeGame();
  }, []);

  // ── 🛠️ GEUPDATETE KLIK-FUNCTIE MET MATCH-LOGICA ──
  const handleCardPress = (clickedId) => {
    // Vind de kaart waar op geklikt is
    const targetCard = cards.find(c => c.id === clickedId);

    // BROWSER GUARD: Klikken mag niet als:
    // - Er al 2 kaarten openliggen (even wachten op het terugdraaien)
    // - De kaart al open ligt (isFlipped)
    // - De kaart al geraden is (isMatched)
    if (selectedCards.length === 2 || targetCard.isFlipped || targetCard.isMatched) {
      return;
    }

    // Stap 1: Draai de geklikte kaart visueel om
    const updatedCards = cards.map(card => {
      if (card.id === clickedId) {
        return { ...card, isFlipped: true };
      }
      return card;
    });
    setCards(updatedCards);

    // Stap 2: Voeg deze kaart toe aan ons tijdelijke keuzelijstje
    const newSelection = [...selectedCards, clickedId];
    setSelectedCards(newSelection);

    // Stap 3: Als dit de TWEEDE kaart is, gaan we controleren!
    if (newSelection.length === 2) {
      const firstCard = cards.find(c => c.id === newSelection[0]);
      const secondCard = targetCard; // Dat is de huidige kaart waar we net op klikten

      if (firstCard.name === secondCard.name) {
        // 🎉 MATCH!
        setTimeout(() => {
          setCards(prevCards => prevCards.map(card => {
            if (card.id === firstCard.id || card.id === secondCard.id) {
              return { ...card, isMatched: true }; // Ze blijven permanent open
            }
            return card;
          }));
          setScore(prevScore => prevScore + 1); // Score omhoog!
          setSelectedCards([]); // Keuzelijst leegmaken voor de volgende beurt
        }, 300);
      } else {
        // ❌ GEEN MATCH! Wacht 1 seconde en draai ze terug
        setTimeout(() => {
          setCards(prevCards => prevCards.map(card => {
            if (card.id === firstCard.id || card.id === secondCard.id) {
              return { ...card, isFlipped: false }; // Terug naar blauw draaien
            }
            return card;
          }));
          setSelectedCards([]); // Keuzelijst leegmaken voor de volgende beurt
        }, 1000); // 1000 milliseconden = 1 seconde kijktijd
      }
    }
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
            // 💡 Een kaart blijft wit als hij omgedraaid óf al geraden (isMatched) is!
            style={[styles.card, (card.isFlipped || card.isMatched) && styles.cardFlipped]}
            activeOpacity={0.7}
            onPress={() => handleCardPress(card.id)}
          >
            <Text style={[styles.cardText, (card.isFlipped || card.isMatched) && styles.cardTextFlipped]}>
              {card.isFlipped || card.isMatched ? card.name.replace('BA ', '') : '❓'}
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
  card: { width: '23%', height: 80, backgroundColor: '#0056b3', borderRadius: 8, justifyContext: 'center', alignItems: 'center', marginBottom: 10, elevation: 3, borderWidth: 1, borderColor: '#004394', justifyContent: 'center' },
  cardText: { fontSize: 24, color: '#fff', fontWeight: 'bold' },
  cardFlipped: { backgroundColor: '#fff', borderColor: '#0056b3' },
  cardTextFlipped: { fontSize: 9, color: '#0056b3', textAlign: 'center', paddingHorizontal: 2, fontWeight: 'bold' },
  restartButton: { backgroundColor: '#212529', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 10, marginBottom: 30 },
  restartButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});