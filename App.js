import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableHighlight, Platform} from 'react-native';

import Cita from './components/Cita';
import Formulario from './components/Formulario';

const App = () => {
  const [mostrarForm, setMostrarForm] = useState(false);

  const [citas, setCitas] = useState([
    {id: '1', paciente: 'Hook', propietario: 'Juan', sintomas: 'No Come'},
    {id: '2', paciente: 'Redux', propietario: 'Itzel', sintomas: 'No Duerme'},
    {id: '3', paciente: 'Native', propietario: 'Josue', sintomas: 'No Canta'},
  ]);

  //Elimina los pacientes del state
  const eliminarPaciente = (id) => {
    setCitas((citasActuales) => citasActuales.filter((cita) => cita.id !== id));
  };

  //Mostrar Formulario
  const handleShowFormCita = () => {
    setMostrarForm(!mostrarForm);
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Administador de Citas</Text>

      <View>
          <TouchableHighlight
            style={styles.btnSubmit}
            onPress={() => handleShowFormCita()}>
            <Text style={styles.textSubmit}>Craer Nueva Cita</Text>
          </TouchableHighlight>
        </View>

      <View style={styles.content}>
        {mostrarForm ? (
          <>
          <Formulario />
          </>
        ) : (
          <>
            <Text style={styles.title}>
              {citas.length > 0
                ? 'Administra tus Citas'
                : 'No hay citas, agrega una'}
            </Text>
            <FlatList
              style={styles.list}
              data={citas}
              renderItem={({item}) => (
                <Cita
                  item={item}
                  eliminarPaciente={() => eliminarPaciente(item.id)}></Cita>
              )}
              keyExtractor={(cita) => cita.id}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#AA076B',
    flex: 1,
  },
  title: {
    marginTop: Platform.OS === 'ios' ? 40: 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
  },
  content: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  list: {
    flex: 1,
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  textSubmit: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
