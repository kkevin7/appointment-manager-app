import React ,{useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import Cita from "./components/Cita";

const App = () => {

  const [citas, setCitas] = useState([
    {id: "1", paciente: "Hook", propietario: 'Juan', sintomas: "No Come"},
    {id: "2", paciente: "Redux", propietario: 'Itzel', sintomas: "No Duerme"},
    {id: "3", paciente: "Native", propietario: 'Josue', sintomas: "No Canta"},
  ]);

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Administador de Citas</Text>
        <FlatList 
          data={citas}
          renderItem={({item}) => (
            <Cita item={item} ></Cita>
          )}
          keyExtractor={cita => cita.id}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#AA076B',
    flex: 1,
  },
  title:{
    marginTop: 40,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
});

export default App;
