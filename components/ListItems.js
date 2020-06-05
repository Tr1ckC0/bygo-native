import React from "react";
import { Button, StyleSheet, Text, FlatList } from "react-native";

const ListItems = ({ items }) => {
  function renderItem({ item }) {
    return <Text style={styles.li}>{item.name}</Text>;
  }

  return (
    <FlatList style={styles.container} data={items} renderItem={renderItem} />
  );
};

const styles = StyleSheet.create({
  container: {},
  li: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    width: 300,
    borderWidth: 2,
    borderColor: "blue",
    padding: 5,
    margin: 5,
  },
});

export default ListItems;