import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

const App = () => {
  return (
      <Text style={styles.title}>Proyectos Citas</Text>
  );
};

const styles = StyleSheet.create({
  title:{
    textAlign: 'center',
    marginTop: 100
  }
});

export default App;
