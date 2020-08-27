import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
  Keyboard,
  Platform,
} from 'react-native';

import Cita from './components/Cita';
import Formulario from './components/Formulario';
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {
  const [mostrarForm, setMostrarForm] = useState(false);
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const obtenerCitasStorage = async () => {
      try {
        const citasStorage = await AsyncStorage.getItem('citas');
        if(citasStorage){
          setCitas(JSON.parse(citasStorage));
        }
      } catch (error) {
        console.log(error);
      }
    }
    obtenerCitasStorage();
  },[])

  //Elimina los pacientes del state
  const eliminarPaciente = (id) => {
    setCitas((citasActuales) => citasActuales.filter((cita) => cita.id !== id));
  };

  //Mostrar Formulario
  const handleShowFormCita = () => {
    setMostrarForm(!mostrarForm);
  };

  //Ocultar Teclado
  const closeKeyboard = () => {
    Keyboard.dismiss();
  };

  //Almacenar las citas en storage
  const guardarCitasStorage = async (citasJSON) => {
    try {
        await AsyncStorage.setItem('citas', citasJSON);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TouchableNativeFeedback onPress={() => closeKeyboard()}>
      <View style={styles.container}>
        <Text style={styles.title}>Administador de Citas</Text>

        <View>
          <TouchableHighlight
            style={styles.btnSubmit}
            onPress={() => handleShowFormCita()}>
            <Text style={styles.textSubmit}>{mostrarForm ? 'Cancelar Nueva Cita' : 'Craer Nueva Cita'}</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.content}>
          {mostrarForm ? (
            <>
            <Text style={styles.title}>Crear Nueva Cita</Text>
              <Formulario citas={citas} setCitas={setCitas} setMostrarForm={setMostrarForm} guardarCitasStorage={guardarCitasStorage} />
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
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#AA076B',
    flex: 1,
  },
  title: {
    marginTop: Platform.OS === 'ios' ? 40 : 20,
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
