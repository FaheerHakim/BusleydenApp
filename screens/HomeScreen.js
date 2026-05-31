import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { WEBFLOW_API_TOKEN } from '../config';
import ProductCard from '../components/ProductCard';
import NewsCard from '../components/NewsCard';

const SITE_ID = '6a0cb8dcdf02ab80c4c2b4de';
const NEWS_COLLECTION_ID = '6a0f86111b7a24ea0e0ee305';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // ✅ E-commerce endpoint (niet de collections endpoint!)
      const productRes = await fetch(
        `https://api.webflow.com/v2/sites/${SITE_ID}/products`,
        { headers: { Authorization: `Bearer ${WEBFLOW_API_TOKEN}` } }
      );
      const productJson = await productRes.json();
      console.log('Product voorbeeld:', JSON.stringify(productJson.items?.[0], null, 2));
      
      // ✅ Nieuws via collections endpoint
      const newsRes = await fetch(
        `https://api.webflow.com/v2/collections/${NEWS_COLLECTION_ID}/items`,
        { headers: { Authorization: `Bearer ${WEBFLOW_API_TOKEN}` } }
      );
      const newsJson = await newsRes.json();

      setProducts(productJson.items || []);
      setNews(newsJson.items || []);
    } catch (error) {
      console.error('Fout bij ophalen data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0056b3" />
        <Text style={{ marginTop: 10 }}>Laden...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>Busleyden Atheneum</Text>

      <Text style={styles.sectionTitle}>Onze Producten ({products.length})</Text>
      <View style={styles.listContainer}>
        {products.map((product) => (
          <ProductCard
            key={product.product?.id}
            product={product}
            onPress={() => navigation.navigate('ProductDetails', { item: product })}
          />
        ))}
      </View>

      <Text style={styles.sectionTitle}>Laatste Nieuws ({news.length})</Text>
      <View style={styles.listContainer}>
        {news.map((item) => (
          <NewsCard
            key={item.id}
            item={item}
            onPress={() => navigation.navigate('NewsDetails', { item: item })}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 15 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mainTitle: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, color: '#1a1a1a' },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 15, marginBottom: 15, color: '#212529', borderBottomWidth: 1, borderBottomColor: '#dee2e6', paddingBottom: 5 },
  listContainer: { marginBottom: 20 },
});