import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';


export default class App extends React.Component {
 render(){ 
  return (
    <View style={styles.container}>
        <Text>
            ---
        </Text>
    </View>
  );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 0,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});

