import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

const Trang05 = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#E8FAEC',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 25,
          color: '#000',
        }}>
        LOGIN
      </Text>

      <View
        style={{
          width: '100%',
          backgroundColor: '#DFF2E1',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          borderRadius: 4,
          marginBottom: 20,
          height: 50,
        }}>
        <TextInput
          style={{
            flex: 1,
            fontSize: 16,
            color: '#000',
          }}
          placeholder="Email"
          placeholderTextColor="#333"
        />
      </View>

      <View
        style={{
          width: '100%',
          backgroundColor: '#DFF2E1',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          borderRadius: 4,
          marginBottom: 20,
          height: 50,
        }}>
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
          backgroundColor: '#D54C3F',
          paddingVertical: 15,
          borderRadius: 4,
          alignItems: 'center',
          marginBottom: 15,
        }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
          LOGIN
        </Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 16, marginBottom: 5 }}>
        When you agree to terms and conditions
      </Text>

      <Text style={{ color: '#5D25FA', fontSize: 16, marginBottom: 15 }}>
        For got your password?
      </Text>

      <Text style={{ fontSize: 16, marginBottom: 15 }}>Or login with</Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: '#3b5998',
            paddingVertical: 12,
            alignItems: 'center',
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
          }}>
          <Image
            source={require('../assets/Facebook.png')}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: '#0077b5',
            paddingVertical: 12,
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/Zalo.png')}
            style={{ width: 20, height: 25 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#ccc',
            paddingVertical: 12,
            alignItems: 'center',
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4,
          }}>
          <Image
            source={require('../assets/Google.png')}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Trang05;