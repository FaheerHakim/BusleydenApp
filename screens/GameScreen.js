import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

// We maken een tijdelijke lijst van 16 dummy-items om onze layout te vullen
const DUMMY_CARDS = Array.from({ length: 16 }, (_, index) => ({ id: index }));

export default function GameScreen({ navigation }) {
  // We slaan de kaarten op in een 'state' zodat we er later logica aan kunnen koppelen
  const [cards, setCards] = useState(DUMMY_CARDS);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>🏫 Campus Memory</Text>

      {/* 📊 STATUSBABAL: Hier tonen we straks de live score en tijd */}
      <View style={styles.statusRow}>
        <Text style={styles.statusText}>⏱️ Tijd: <Text style={styles.bold}>{timeLeft}s</Text></Text>
        <Text style={styles.statusText}>🏆 Score: <Text style={styles.bold}>{score}</Text></Text>
      </View>

      {/* 🎴 HET SPEELVELD: Een grid van 4x4 kaarten */}
      <View style={styles.grid}>
        {cards.map((card) => (
          <TouchableOpacity 
            key={card.id} 
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => console.log(`Je klikte op kaart ${card.id}`)}
          >
            {/* Elke dichte kaart krijgt nu simpelweg een vraagteken */}
            <Text style={styles.cardText}>❓</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 🔄 HERSTARTKNOP */}
      <TouchableOpacity style={styles.restartButton}>
        <Text style={styles.restartButtonText}>🔄 Spel Herstarten</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa', 
    padding: 15 
  },
  mainTitle: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginVertical: 15, 
    color: '#1a1a1a' 
  },
  statusRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 20, 
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statusText: { 
    fontSize: 16, 
    color: '#495057' 
  },
  bold: { 
    fontWeight: 'bold', 
    color: '#0056b3' 
  },
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap',            // 💡 Dit zorgt ervoor dat kaarten doorlopen op de volgende regel!
    justifyContent: 'space-between', 
    marginBottom: 20 
  },
  card: { 
    width: '23%',                // 💡 Exact ~23% zorgt ervoor dat er precies 4 kaarten op één rij passen
    height: 80, 
    backgroundColor: '#0056b3', // Mooi schoolblauw
    borderRadius: 8, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 10,
    elevation: 3,
  },
  cardText: { 
    fontSize: 24, 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  restartButton: { 
    backgroundColor: '#212529', 
    paddingVertical: 14, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 10, 
    marginBottom: 30 
  },
  restartButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});