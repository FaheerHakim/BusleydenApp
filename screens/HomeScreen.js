import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, ActivityIndicator,
  ScrollView, TextInput, TouchableOpacity
} from 'react-native';
import { WEBFLOW_API_TOKEN } from '../config';
import ProductCard from '../components/ProductCard';
import NewsCard from '../components/NewsCard';
import CampusCard from '../components/CampusCard';

const SITE_ID = '6a0cb8dcdf02ab80c4c2b4de';
const NEWS_COLLECTION_ID = '6a0f86111b7a24ea0e0ee305';
const CATEGORY_COLLECTION_ID = '6a11a6d7562485b39b87f883';
const CAMPUS_COLLECTION_ID = '6a0edafa08de0a82cfb2f155';

const PRODUCT_SORT_OPTIONS = [
  { label: 'Naam A→Z', value: 'name_asc' },
  { label: 'Naam Z→A', value: 'name_desc' },
  { label: 'Prijs laag→hoog', value: 'price_asc' },
  { label: 'Prijs hoog→laag', value: 'price_desc' },
];

const NEWS_SORT_OPTIONS = [
  { label: 'Naam A→Z', value: 'name_asc' },
  { label: 'Naam Z→A', value: 'name_desc' },
];

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState({});
  const [campuses, setCampuses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [productSearch, setProductSearch] = useState('');
  const [productSort, setProductSort] = useState('name_asc');
  const [productCategory, setProductCategory] = useState('all');

  const [newsSearch, setNewsSearch] = useState('');
  const [newsSort, setNewsSort] = useState('name_asc');
  const [newsCategory, setNewsCategory] = useState('all');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const productRes = await fetch(
        `https://api.webflow.com/v2/sites/${SITE_ID}/products`,
        { headers: { Authorization: `Bearer ${WEBFLOW_API_TOKEN}` } }
      );
      const productJson = await productRes.json();

      const newsRes = await fetch(
        `https://api.webflow.com/v2/collections/${NEWS_COLLECTION_ID}/items`,
        { headers: { Authorization: `Bearer ${WEBFLOW_API_TOKEN}` } }
      );
      const newsJson = await newsRes.json();

      const catRes = await fetch(
        `https://api.webflow.com/v2/collections/${CATEGORY_COLLECTION_ID}/items`,
        { headers: { Authorization: `Bearer ${WEBFLOW_API_TOKEN}` } }
      );
      const catJson = await catRes.json();

      const catMap = {};
      (catJson.items || []).forEach(cat => {
        catMap[cat.id] = cat.fieldData?.name || cat.id;
      });

      // ✅ Campus fetch toegevoegd
      const campusRes = await fetch(
        `https://api.webflow.com/v2/collections/${CAMPUS_COLLECTION_ID}/items`,
        { headers: { Authorization: `Bearer ${WEBFLOW_API_TOKEN}` } }
      );
      const campusJson = await campusRes.json();

      setProducts(productJson.items || []);
      setNews(newsJson.items || []);
      setCategories(catMap);
      setCampuses(campusJson.items || []);
    } catch (error) {
      console.error('Fout bij ophalen data:', error);
    } finally {
      setLoading(false);
    }
  };

  const productCategories = ['all', ...new Set(
    products.map(p => p.product?.fieldData?.category?.[0]).filter(Boolean)
  )];

  const newsCategories = ['all', ...new Set(
    news.map(n => n.fieldData?.category).filter(Boolean)
  )];

  const filteredProducts = products
    .filter(p => {
      const name = p.product?.fieldData?.name?.toLowerCase() || '';
      const cat = p.product?.fieldData?.category?.[0] || '';
      const matchSearch = name.includes(productSearch.toLowerCase());
      const matchCat = productCategory === 'all' || cat === productCategory;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      const nameA = a.product?.fieldData?.name || '';
      const nameB = b.product?.fieldData?.name || '';
      const priceA = a.skus?.[0]?.fieldData?.price?.value || 0;
      const priceB = b.skus?.[0]?.fieldData?.price?.value || 0;
      if (productSort === 'name_asc') return nameA.localeCompare(nameB);
      if (productSort === 'name_desc') return nameB.localeCompare(nameA);
      if (productSort === 'price_asc') return priceA - priceB;
      if (productSort === 'price_desc') return priceB - priceA;
      return 0;
    });

  const filteredNews = news
    .filter(n => {
      const name = n.fieldData?.name?.toLowerCase() || '';
      const cat = n.fieldData?.category || '';
      const matchSearch = name.includes(newsSearch.toLowerCase());
      const matchCat = newsCategory === 'all' || cat === newsCategory;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      const nameA = a.fieldData?.name || '';
      const nameB = b.fieldData?.name || '';
      if (newsSort === 'name_asc') return nameA.localeCompare(nameB);
      if (newsSort === 'name_desc') return nameB.localeCompare(nameA);
      return 0;
    });

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

      {/* ── PRODUCTEN ── */}
      <Text style={styles.sectionTitle}>Onze Producten ({filteredProducts.length})</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Zoek een product..."
        value={productSearch}
        onChangeText={setProductSearch}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
        {PRODUCT_SORT_OPTIONS.map(opt => (
          <TouchableOpacity
            key={opt.value}
            style={[styles.chip, productSort === opt.value && styles.chipActive]}
            onPress={() => setProductSort(opt.value)}
          >
            <Text style={[styles.chipText, productSort === opt.value && styles.chipTextActive]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
        {productCategories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.chip, productCategory === cat && styles.chipActive]}
            onPress={() => setProductCategory(cat)}
          >
            <Text style={[styles.chipText, productCategory === cat && styles.chipTextActive]}>
              {cat === 'all' ? 'Alle' : (categories[cat] || cat)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.listContainer}>
        {filteredProducts.length === 0 ? (
          <Text style={styles.emptyText}>Geen producten gevonden.</Text>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.product?.id}
              product={product}
              onPress={() => navigation.navigate('ProductDetails', { item: product })}
            />
          ))
        )}
      </View>

      {/* ── NIEUWS ── */}
      <Text style={styles.sectionTitle}>Laatste Nieuws ({filteredNews.length})</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Zoek een artikel..."
        value={newsSearch}
        onChangeText={setNewsSearch}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
        {NEWS_SORT_OPTIONS.map(opt => (
          <TouchableOpacity
            key={opt.value}
            style={[styles.chip, newsSort === opt.value && styles.chipActive]}
            onPress={() => setNewsSort(opt.value)}
          >
            <Text style={[styles.chipText, newsSort === opt.value && styles.chipTextActive]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
        {newsCategories.map(cat => (
          <TouchableOpacity
            key={String(cat)}
            style={[styles.chip, newsCategory === cat && styles.chipActive]}
            onPress={() => setNewsCategory(cat)}
          >
            <Text style={[styles.chipText, newsCategory === cat && styles.chipTextActive]}>
              {cat === 'all' ? 'Alle' : (categories[cat] || cat)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.listContainer}>
        {filteredNews.length === 0 ? (
          <Text style={styles.emptyText}>Geen artikelen gevonden.</Text>
        ) : (
          filteredNews.map((item) => (
            <NewsCard
              key={item.id}
              item={item}
              onPress={() => navigation.navigate('NewsDetails', { item: item })}
            />
          ))
        )}
      </View>

      {/* ── CAMPUSSEN ── */}
      <Text style={styles.sectionTitle}>Onze Campussen ({campuses.length})</Text>
      <View style={styles.listContainer}>
        {campuses.map((campus) => (
          <CampusCard
            key={campus.id}
            item={campus}
            onPress={() => navigation.navigate('CampusDetails', { item: campus })}
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
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 15, marginBottom: 10, color: '#212529', borderBottomWidth: 1, borderBottomColor: '#dee2e6', paddingBottom: 5 },
  listContainer: { marginBottom: 20 },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#dee2e6',
    marginBottom: 10,
  },
  chipRow: { flexDirection: 'row', marginBottom: 10 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#e9ecef',
    marginRight: 8,
  },
  chipActive: { backgroundColor: '#0056b3' },
  chipText: { fontSize: 13, color: '#495057' },
  chipTextActive: { color: '#fff', fontWeight: 'bold' },
  emptyText: { textAlign: 'center', color: '#adb5bd', marginTop: 20, fontSize: 15 },
});