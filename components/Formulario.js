import React, {useState} from 'react';
import {Text, TextInput, Button, View, StyleSheet} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Formulario = () => {

  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
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
    const options = {year: 'numeric', month: 'long', day: '2-digit'}
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
    const options = {hour: 'numeric', minute: '2-digit'}
    setTime(date.toLocaleDateString('en-US', options));
    hideTimePicker();
  };

  return (
    <>
      <View style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => console.log(text)}
          />
        </View>

        <View>
          <Text style={styles.label}>Dueño: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => console.log(text)}
          />
        </View>

        <View>
          <Text style={styles.label}>Télefono: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => console.log(text)}
            keyboardType={'numeric'}
          />
        </View>

        <View>
          <Text style={styles.label}>Date:</Text>
          <Button title="Select Date" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            locale='en_US'
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
            locale='en_US'
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
            onChangeText={(text) => console.log(text)}
          />
        </View>
      </View>
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
});

export default Formulario;
