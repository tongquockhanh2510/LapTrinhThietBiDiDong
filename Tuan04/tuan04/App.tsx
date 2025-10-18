import { Text, SafeAreaView, StyleSheet } from 'react-native';

import { Card } from 'react-native-paper';

import Trang01 from './components/Trang01';
import Trang02 from './components/Trang02';
import Trang03 from './components/Trang03';
import Trang04 from './components/Trang04';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Trang04/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

});
