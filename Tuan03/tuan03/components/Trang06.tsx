import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { RadioButton } from 'react-native-paper';

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
        REGISTER
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
          placeholder="Name"
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
          placeholder="Phone"
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
          placeholder="Brithday"
          placeholderTextColor="#333"
        />
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          marginBottom: 20,
          height: 50,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 30,
          }}>
          <RadioButton status="unchecked" />
          <Text style={{ fontSize: 16, color: '#000' }}>Male</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton status="unchecked" />
          <Text style={{ fontSize: 16, color: '#000' }}>Female</Text>
        </View>
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
          REGISTER
        </Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 14 }}>
        When you agree to terms and conditions
      </Text>
    </View>
  );
};

export default Trang05;
