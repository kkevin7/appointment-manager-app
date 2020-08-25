import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import Cita from './components/Cita';
import Formulario from "./components/Formulario";

const App = () => {
  const [citas, setCitas] = useState([
    {id: '1', paciente: 'Hook', propietario: 'Juan', sintomas: 'No Come'},
    {id: '2', paciente: 'Redux', propietario: 'Itzel', sintomas: 'No Duerme'},
    {id: '3', paciente: 'Native', propietario: 'Josue', sintomas: 'No Canta'},
  ]);

  //Elimina los pacientes del state
  const eliminarPaciente = (id) => {
    setCitas((citasActuales) => citasActuales.filter((cita) => cita.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Administador de Citas</Text>
      <Formulario/>
      <Text style={styles.title}>
        {citas.length > 0 ? 'Administra tus Citas' : 'No hay citas, agrega una'}
      </Text>
      <FlatList
        data={citas}
        renderItem={({item}) => (
          <Cita item={item} eliminarPaciente={() => eliminarPaciente(item.id)}></Cita>
        )}
        keyExtractor={(cita) => cita.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#AA076B',
    flex: 1,
  },
  title: {
    marginTop: 40,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#FFF",
  },
});

export default App;
