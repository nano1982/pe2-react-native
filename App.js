import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  ImageBackground
} from "react-native";

import { useState } from "react";
import React from "react";


export default function App() {
  const [textItem, setTextItem] = useState("");
  const [list, setList] = useState([]);
  const [itemSelected, setItemSelected] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [cupo, setCupo] = useState(10);


  const onHandleChangeText = text => {
    setTextItem(text);
    console.log(text);
  };

  const addItem = () => {
    setList(prevState => [
      ...prevState,
      { name: textItem, id: Math.random().toString() },
    ]);
    setTextItem("");
    if (cupo < 10) {
      setCupo(prevState => prevState + 1)
    }
    else
    {
      setCupo(10)
    }
  };

  const onHandleModal = item => {
    setItemSelected(item);
    setModalVisible(true);
  };

  const onHandleDelete = item => {
    setList(prevState =>
      prevState.filter(element => element.name !== item.name)
    );
    setModalVisible(false);
    if (cupo > 0) {
      setCupo(prevState => prevState -1)
    }
    else {
      setCupo(0)
    }
  };


  const renderItem = ({ item }) => (
    <View style={styles.renderItemStyle}>
      <Text>{item.name}</Text>
      <Button title="X" onPress={() => onHandleModal(item)} color={"red"} />
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./src/images/bgi.jpg')} resizeMode="cover" style={styles.image}></ImageBackground>
      <View style={styles.inputContainer}>
        <Text style={styles.titleContainer}>Pilates Le Style</Text>
        <View style={styles.addItemContainer}>
          <TextInput
            placeholder="Ingrese un nuevo alumno"
            style={styles.input}
            onChangeText={onHandleChangeText}
            value={textItem}
          />
          <Button title="Agregar" onPress={addItem} />
          <Text>Máximo permitido de alumnos: 10</Text>
          <Text>Alumnos disponibles: {cupo}</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <Modal
        isVisible={modalVisible}
        actionDeleteItem={() => onHandleDelete(itemSelected)}
        itemSelected={itemSelected}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7EAF2",
  },
  image: {
    flex: 1,
    justifyContent: 'center'
  },
  inputContainer: {
    height: 200,
    paddingHorizontal: 30,
    paddingTop: 80,
  },
  titleContainer: {
    marginBottom: 30,
    fontSize: 40,
    fontWeight: "500",
    color: "#1E283C",
  },
  addItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    width: 200,
  },
  listContainer: {
    flex: 2,
    marginHorizontal: 30,
    marginTop: 20,
    padding: 3,
  },
  renderItemStyle: {
    height: 60,
    flexDirection: "row",
    marginBottom: 25,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 3,
  },
});
