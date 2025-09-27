import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductCardScreen from './components/ProductCart';
import ColorPickerScreen from './components/ProductColorPicker';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductCard" screenOptions={{headerShown: false}}>
        <Stack.Screen name="ProductCard" component={ProductCardScreen} />
        <Stack.Screen name="ColorPicker" component={ColorPickerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}