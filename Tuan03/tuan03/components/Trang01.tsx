import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';

const Trang01 = () => {
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: 'column',
          backgroundColor: '#00CCF9',
        },
      ]}>
      <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../assets/Logo.png')}
          style={{ width: 150, height: 150 }}
        />
      </View>
      <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 25,
            flexWrap: 'wrap',
            width: 260,
            textAlign: 'center',
            fontWeight: 700,
          }}>
          GROW
        </Text>
        <Text
          style={{
            fontSize: 25,
            flexWrap: 'wrap',
            width: 260,
            textAlign: 'center',
            fontWeight: 700,
          }}>
          YOUR BUSINESS
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
          We will help you to grow your business using online server
        </Text>
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
            width: 100,
            borderRadius: 5,
            margin: 10,
          }}>
          <Text style={{ textAlign: 'center', fontWeight: 700 }}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#E3C000',
            padding: 10,
            width: 100,
            borderRadius: 5,
            margin: 10,
          }}>
          <Text style={{ textAlign: 'center', fontWeight: 700 }}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
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

export default Trang01;
