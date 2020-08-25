import React, {useState} from 'react';
import {
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';

const Formulario = ({citas, setCitas, setMostrarForm}) => {
  const [paciente, setPaciente] = useState('');
  const [propietario, setPropietario] = useState('');
  const [telefono, setTelefono] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  // Muestra u oculta el Date Picker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    const options = {year: 'numeric', month: 'long', day: '2-digit'};
    setDate(date.toLocaleDateString('en-US', options));
    hideDatePicker();
  };

  // Muestra u oculta el Time Picker
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (date) => {
    const options = {hour: 'numeric', minute: '2-digit'};
    setTime(date.toLocaleDateString('en-US', options));
    hideTimePicker();
  };

  //Crear nueva cita
  const crearNuevaCita = () => {
    // console.log("Nueva Cita");
    if (
      paciente.trim() === '' ||
      propietario.trim() === '' ||
      date.trim() === '' ||
      time.trim() === '' ||
      sintomas.trim() === ''
    ) {
      // Falla la validación
      mostrarAlerta();
      return;
    }else{
      // Crear una nueva cita
      const cita = {paciente, propietario, telefono, date, time, sintomas };
      cita.id = shortid.generate();
      //Agregar al state
      const allCitas = [...citas, cita];
      console.log(allCitas);
      setCitas(allCitas);
      //Ocular el formulario
      setMostrarForm(false);
    }
  };

  // Muestra la alarta si falla la validación
  const mostrarAlerta = () => {
    Alert.alert('Error', 'Todos los campos', [
      {
        text: 'Ok',
      },
    ]);
  };

  return (
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPaciente(text)}
          />
        </View>

        <View>
          <Text style={styles.label}>Dueño: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPropietario(text)}
          />
        </View>

        <View>
          <Text style={styles.label}>Télefono: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setTelefono(text)}
            keyboardType={'numeric'}
          />
        </View>

        <View>
          <Text style={styles.label}>Date:</Text>
          <Button title="Select Date" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            locale="en_US"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
            headerTextIOS="Select Date"
            cancelTextIOS="Cancel"
            confirmTextIOS="Confirm"
          />
          <Text>{date}</Text>
        </View>

        <View>
          <Text style={styles.label}>Time:</Text>
          <Button title="Select Time" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            locale="en_US"
            onConfirm={handleConfirmTime}
            onCancel={hideTimePicker}
            headerTextIOS="Select Time"
            cancelTextIOS="Cancel"
            confirmTextIOS="Confirm"
          />
          <Text>{time}</Text>
        </View>

        <View>
          <Text style={styles.label}>Síntomas: </Text>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={(text) => setSintomas(text)}
          />
        </View>

        <View>
          <TouchableHighlight
            style={styles.btnSubmit}
            onPress={() => crearNuevaCita()}>
            <Text style={styles.textSubmit}>Craer Nueva Cita</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: '2.5%',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
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

export default Formulario;
