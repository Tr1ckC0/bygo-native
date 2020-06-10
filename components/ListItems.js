import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
} from "react-native";

const ListItems = ({ items, handleDel, handleCheck }) => {
  function renderItem({ item }) {
    return (
      <TouchableOpacity style={styles.li}>
        <TouchableOpacity>
          <Text style={styles.delButton} onPress={() => handleDel(item)}>
            X
          </Text>
        </TouchableOpacity>
        <Text style={styles.text}>{item.name}</Text>
        <TouchableOpacity>
          <Text style={styles.checkButton} onPress={() => handleCheck(item)}>
          &#10003;
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    // borderWidth: 2,
    // borderColor: "green"
  },
  li: {
    flex: 1,
    flexDirection: "row",
    width: 300,
    borderWidth: 2,
    borderColor: "blue",
    padding: 5,
    margin: 5,
  },
  text: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: 5,
    fontSize: 17,
    // borderWidth: 2
  },
  delButton: {
    flex: 1,
    margin: 5,
    fontSize: 15,
    color: "red",
    // borderWidth: 2
  },
  checkButton: {
    flex: 1,
    margin: 5,
    fontSize: 15,
    color: "green",
  }
});

export default ListItems;
