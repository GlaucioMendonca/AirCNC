import React, { useEffect, useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  Platform,
  AsyncStorage,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert
} from "react-native";

import socketio from 'socket.io-client'
import SpotList from "../components/SpotList";
import logo from "../assets/logo.png";

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then( user_id => {
      const socket = socketio('http://10.0.0.11:3333', {
        query: { user_id }
      })

      socket.on('booking_response', booking => {
        console.log(booking)
        Alert.alert(`Sua reserva em ${booking.spot.company} para o dia ${booking.date} foi ${booking.approved ? 'Aprovada': 'Reprovada'}`)
      })
    })
  },[]);

  useEffect(() => {
    AsyncStorage.getItem("techs").then(storegedTechs => {
      if (storegedTechs) {
        const techsArray = storegedTechs.split(",").map(tech => tech.trim());
        setTechs(techsArray);
      }
    });
  }, []);
  function handleLogout(){

    AsyncStorage.multiRemove(['techs', 'user']).then(
      navigation.navigate('Login')
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <TouchableOpacity onPress={handleLogout}>
        <Text> Sair </Text>
      </TouchableOpacity>
      <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0
  },
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10
  }
});
