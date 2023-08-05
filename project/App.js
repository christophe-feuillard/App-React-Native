import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export default function App() {

  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")

  useEffect(() => {
    (async() => {

      let { status } = await Location.requestForegroundPermissionsAsync()

      if (status == 'granted') {
        console.log('permission succesful')
      } else {
        console.log('permi non autorisé')
      }

      const position = await Location.getCurrentPositionAsync()
      console.log(position)

      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
      // console.log(position.coords.latitude)
      // console.log(position.coords.longitude)

    })()

  }, [])
  return (
    <View style={styles.container}>
      <Text>test</Text>
      <Text>{latitude}</Text>
      <Text>{longitude}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
