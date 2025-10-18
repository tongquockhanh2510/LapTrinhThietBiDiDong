import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const Trang02 = () => {
  return (
    <LinearGradient
      colors={['#f8c800', '#dab000', '#c39e00']}
      style={styles.container}>
      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-start' }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            marginBottom: 25,
            color: '#000',
          }}>
          LOGIN
        </Text>
      </View>
      <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#dcbd3b',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            borderColor: '#ffffff',
            borderWidth: 2,
            marginBottom: 20,
            height: 50,
          }}>
          <Image
            source={require('../assets/User.png')}
            style={{ width: 25, height: 25, marginEnd: 10 }}
          />
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
              color: '#000',
            }}
            placeholder="Email"
            placeholderTextColor="#000"
          />
        </View>

        <View
          style={{
            width: '100%',
            backgroundColor: '#dcbd3b',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            borderColor: '#ffffff',
            borderWidth: 2,
            marginBottom: 20,
            height: 50,
          }}>
          <Image
            source={require('../assets/Lock.png')}
            style={{ width: 25, height: 25, marginEnd: 10 }}
          />
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
              color: '#000',
            }}
            placeholder="Password"
            placeholderTextColor="#333"
            secureTextEntry={true}
          />
          <Image
            source={require('../assets/Eye.png')}
            style={{ width: 35, height: 25 }}
          />
        </View>

        <TouchableOpacity
          style={{
            width: '100%',
            backgroundColor: '#000000',
            paddingVertical: 15,
            borderRadius: 4,
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
            LOGIN
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 5,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Forgot your password?
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});

export default Trang02;
