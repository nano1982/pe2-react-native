import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useState } from "react";

export default function App() {
  const [textItem, setTextItem] = useState("");
  const [list, setList] = useState([]);

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
  };

  const renderItem = ({ item }) => (
    <View style={styles.renderItemStyle}>
      <Text>{item.name}</Text>
      <Button
        title="X"
        onPress={() => console.log("Aqui se abrira un modal")}
        color={"red"}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.titleContainer}>Shopping List</Text>
        <View style={styles.addItemContainer}>
          <TextInput
            placeholder="elemento de la lista"
            style={styles.input}
            onChangeText={onHandleChangeText}
            value={textItem}
          />
          <Button title="Presiona aqui" onPress={addItem} />
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7EAF2",
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
