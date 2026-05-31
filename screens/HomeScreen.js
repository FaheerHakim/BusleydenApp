import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Button } from 'react-native';
import { WEBFLOW_API_TOKEN, PRODUCT_COLLECTION_ID, NEWS_COLLECTION_ID } from '../config';

export default function HomeScreen({ navigation }) {
  // States voor het opslaan van de data en laad-status
  const [products, setProducts] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect zorgt ervoor dat de data meteen wordt opgehaald als het scherm laadt
  useEffect(() => {
    fetchWebflowData();
  }, []);

  const fetchWebflowData = async () => {
    try {
      // 1. Fetch Producten
      const productResponse = await fetch(`https://api.webflow.com/v2/collections/${PRODUCT_COLLECTION_ID}/items`, {
        headers: { Authorization: `Bearer ${WEBFLOW_API_TOKEN}` }
      });
      const productJson = await productResponse.json();
      
      // 2. Fetch Nieuws/Blogs
      const newsResponse = await fetch(`https://api.webflow.com/v2/collections/${NEWS_COLLECTION_ID}/items`, {
        headers: { Authorization: `Bearer ${WEBFLOW_API_TOKEN}` }
      });
      const newsJson = await newsResponse.json();

      // JSON data opslaan in onze states (we pakken de 'items' array uit de JSON)
      setProducts(productJson.items || []);
      setNews(newsJson.items || []);
    } catch (error) {
      console.error("Fout bij het ophalen van Webflow data:", error);
    } finally {
      // Het laden is klaar, zet de laad-indicator uit
      setLoading(false);
    }
  };

  // Als de app nog aan het laden is, tonen we een laadwieltje (Core component: ActivityIndicator)
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Data ophalen uit Webflow...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>Busleyden Atheneum</Text>
      
      <Text style={styles.sectionTitle}>Producten ({products.length})</Text>
      {products.map((product) => (
        <View key={product.id} style={styles.dataBox}>
          <Text style={styles.itemName}>{product.fieldData.name}</Text>
          <Button 
            title="Bekijk Product" 
            onPress={() => navigation.navigate('ProductDetails', { itemId: product.id })} 
          />
        </View>
      ))}

      <Text style={styles.sectionTitle}>Nieuwsartikelen ({news.length})</Text>
      {news.map((item) => (
        <View key={item.id} style={styles.dataBox}>
          <Text style={styles.itemName}>{item.fieldData.name}</Text>
          <Button 
            title="Lees Artikel" 
            onPress={() => navigation.navigate('NewsDetails', { itemId: item.id })} 
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 15 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mainTitle: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: '#333' },
  dataBox: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, elevation: 2 },
  itemName: { fontSize: 16, marginBottom: 10, fontWeight: '500' }
});