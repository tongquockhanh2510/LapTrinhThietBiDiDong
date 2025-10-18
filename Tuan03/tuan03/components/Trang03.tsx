import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Trang03 = () => {
  return (
    <LinearGradient
      colors={['#c8f3f6', '#cef4f6', '#def4f5', '#03cdf9']}
      style={styles.container}>
      <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../assets/Lock.png')}
          style={{ width: 100, height: 110 }}
        />
      </View>
      <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 25,
            flexWrap: 'wrap',
            width: 200,
            textAlign: 'center',
            fontWeight: 700,
          }}>
          FORGET PASSWORD
        </Text>
        <Text
          style={{
            fontSize: 15,
            flexWrap: 'wrap',
            width: 300,
            textAlign: 'center',
            fontWeight: 700,
            marginTop: 20,
          }}>
          Provide your account’s email for which you want to reset your password
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 0,
        }}>
        <Image
          source={require('../assets/Mail.png')}
          style={{ width: 40, height: 40, margin: 0, borderWidth: 1 }}
        />
        <TextInput
          style={{
            ...styles.input,
            flex: 1,
            borderWidth: 1,
            borderStartWidth: 0,
            backgroundColor: '#C4C4C4',
          }}
          placeholder="Email"
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#E3C000',
            padding: 10,
            flex: 1,
            borderRadius: 5,
          }}>
          <Text style={{ textAlign: 'center', fontWeight: 700 }}>NEXT</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}></View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  input: {
    height: 40,
    padding: 10,
  },
});

export default Trang03;
