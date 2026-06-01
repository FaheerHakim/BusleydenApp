import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';

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
  const [selectedCards, setSelectedCards] = useState([]);
  
  // We gebruiken een ref om bij te houden of het spel actief is, zodat de timer weet wanneer hij moet stoppen
  const gameActiveRef = useRef(true);

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
    setSelectedCards([]);
    gameActiveRef.current = true;
  };

  // ⏱️ LIVE TIMER EFFECT
  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    // Als het spel niet meer actief is (bijv. gewonnen), doen we niks
    if (!gameActiveRef.current) return;

    // Als de tijd op is, verlies je!
    if (timeLeft === 0) {
      gameActiveRef.current = false;
      Alert.alert('⏰ Tijd is om!', 'Helaas, je hebt de campussen niet op tijd gevonden. Probeer het nog eens!', [
        { text: 'Opnieuw Proberen', onPress: initializeGame }
      ]);
      return;
    }

    // Elk seconde halen we er 1 seconde af
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    // Netjes opruimen als de component herlaadt
    return () => clearInterval(timer);
  }, [timeLeft]);

  // 🏆 GEWONNEN CHECK EFFECT
  useEffect(() => {
    if (score === 8) {
      gameActiveRef.current = false; // Stop de timer direct
      Alert.alert('🎉 Geweldig gedaan!', `Je hebt alle campussen binnen de tijd gematcht! Score: ${score}/8`, [
        { text: 'Nog een keer!', onPress: initializeGame },
        { text: 'Terug naar Home', onPress: () => navigation.goBack() }
      ]);
    }
  }, [score]);

  const handleCardPress = (clickedId) => {
    if (!gameActiveRef.current) return; // Klikken mag niet als spel afgelopen is

    const targetCard = cards.find(c => c.id === clickedId);

    if (selectedCards.length === 2 || targetCard.isFlipped || targetCard.isMatched) {
      return;
    }

    const updatedCards = cards.map(card => {
      if (card.id === clickedId) {
        return { ...card, isFlipped: true };
      }
      return card;
    });
    setCards(updatedCards);

    const newSelection = [...selectedCards, clickedId];
    setSelectedCards(newSelection);

    if (newSelection.length === 2) {
      const firstCard = cards.find(c => c.id === newSelection[0]);
      const secondCard = targetCard;

      if (firstCard.name === secondCard.name) {
        setTimeout(() => {
          setCards(prevCards => prevCards.map(card => {
            if (card.id === firstCard.id || card.id === secondCard.id) {
              return { ...card, isMatched: true };
            }
            return card;
          }));
          setScore(prevScore => prevScore + 1);
          setSelectedCards([]);
        }, 300);
      } else {
        setTimeout(() => {
          setCards(prevCards => prevCards.map(card => {
            if (card.id === firstCard.id || card.id === secondCard.id) {
              return { ...card, isFlipped: false };
            }
            return card;
          }));
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>🏫 Campus Memory</Text>

      <View style={styles.statusRow}>
        {/* De timer kleurt rood als er minder dan 10 seconden over zijn! */}
        <Text style={styles.statusText}>
          ⏱️ Tijd: <Text style={[styles.bold, timeLeft <= 10 && styles.dangerText]}>{timeLeft}s</Text>
        </Text>
        <Text style={styles.statusText}>🏆 Score: <Text style={styles.bold}>{score}/8</Text></Text>
      </View>

      <View style={styles.grid}>
        {cards.map((card) => (
          <TouchableOpacity 
            key={card.id} 
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
  dangerText: { color: '#dc3545', fontWeight: 'bold' }, // Rode tekst voor tijdsnood
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  card: { width: '23%', height: 80, backgroundColor: '#0056b3', borderRadius: 8, alignItems: 'center', marginBottom: 10, elevation: 3, borderWidth: 1, borderColor: '#004394', justifyContent: 'center' },
  cardText: { fontSize: 24, color: '#fff', fontWeight: 'bold' },
  cardFlipped: { backgroundColor: '#fff', borderColor: '#0056b3' },
  cardTextFlipped: { fontSize: 9, color: '#0056b3', textAlign: 'center', paddingHorizontal: 2, fontWeight: 'bold' },
  restartButton: { backgroundColor: '#212529', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 10, marginBottom: 30 },
  restartButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});