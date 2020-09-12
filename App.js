import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { YellowBox } from "react-native";
import _ from "lodash";
 YellowBox.ignoreWarnings(["Setting a timer"]);
 const _console = _.clone(console);
 console.warn = (message) => {
   if (message.indexOf("Setting a timer") <= -1) {
     _console.warn(message);
   }
 }; 
import BottomTabNavigator from "./components/BottomTabNavigator";
import SignupLoginScreen from './screens/signupLoginScreen';
export default function App() {
  return (
    <View style={styles.container}>
      <SignupLoginScreen/>
      <BottomTabNavigator/>
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
