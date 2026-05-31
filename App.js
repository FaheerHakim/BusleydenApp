import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Schermen importeren
import HomeScreen from './screens/HomeScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import NewsDetailsScreen from './screens/NewsDetailsScreen';
import CampusDetailsScreen from './screens/CampusDetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Busleyden Atheneum' }} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Product' }} />
        <Stack.Screen name="NewsDetails" component={NewsDetailsScreen} options={{ title: 'Nieuwsartikel' }} />
        <Stack.Screen name="CampusDetails" component={CampusDetailsScreen} options={{ title: 'Campus' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}