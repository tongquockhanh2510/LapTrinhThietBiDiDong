import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

const Trang08 = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}>
      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../assets/Eyeball.png')}
          style={{ width: 150, height: 150 }}
        />
      </View>

      <View
        style={{
          flex: 3,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            borderBottomWidth: 1,
            marginBottom: 20,
            height: 50,
          }}>
          <Image
            source={require('../assets/User_2.png')}
            style={{ width: 25, height: 25, marginEnd: 10 }}
          />
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
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            borderBottomWidth: 1,
            marginBottom: 20,
            height: 50,
          }}>
          <Image
            source={require('../assets/Lock_2.png')}
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
        </View>

        <TouchableOpacity
          style={{
            width: '100%',
            backgroundColor: '#386FFC',
            paddingVertical: 15,
            borderRadius: 10,
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
            LOGIN
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>Register</Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>Forgot Password</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginBottom: 20
          }}>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            Other Login Methods
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Image
          source={require('../assets/Group_01.png')}
          style={{ width: 70, height: 70 }}
        />
        <Image
          source={require('../assets/Group_02.png')}
          style={{ width: 70, height: 70 }}
        />
        <Image
          source={require('../assets/Group_03.png')}
          style={{ width: 70, height: 70 }}
        />
      </View>
    </View>
  );
};

export default Trang08;
