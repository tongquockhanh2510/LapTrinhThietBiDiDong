import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const Trang04 = () => {
  return (
    <LinearGradient
      colors={['#c8f3f6', '#cef4f6', '#def4f5', '#03cdf9']}
      style={styles.container}>
      <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 60,
            flexWrap: 'wrap',
            width: 200,
            textAlign: 'center',
            fontWeight: 700,
          }}>
          CODE
        </Text>
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
          VERIFICATION
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
          Enter ontime password sent on ++849092605798
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
        <OTPInputView
          style={{

          }}
          pinCount={6}
          codeInputFieldStyle={{
            width: 45,
            height: 55,
            borderWidth: 2,
            borderColor: '#000000',
            backgroundColor: '#ffffff00',
            color: '#000',
            fontSize: 18,
            textAlign: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 2,
          }}
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
          <Text style={{ textAlign: 'center', fontWeight: 700 }}>VERIFY CODE</Text>
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

export default Trang04;
