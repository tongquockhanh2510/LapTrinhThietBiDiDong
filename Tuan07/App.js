import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import TaskListScreen from './screens/TaskListScreen';
import AddJobScreen from './screens/AddJobScreen';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Tasks" component={TaskListScreen} />
          <Stack.Screen name="AddJob" component={AddJobScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}