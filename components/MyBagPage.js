import React, {useState, useEffect} from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

import ListItems from "./ListItems";

import { itemsState } from "../service/itemsState";
import { useRecoilState } from "recoil";

import {URL, replaceItemAtIndex} from "../service/helpers"


const MyBagPage = () => {
  const [items, setItems] = useRecoilState(itemsState);

  function removeOneItem(item) {
    toggleClicked()
    let editedItem = {...item, checked: false}
    let idx = items.findIndex(i => i.id === item.id)
    setItems(prev => replaceItemAtIndex(prev, idx, editedItem))
  }

  function emptyBag() {
    toggleClicked()
    setItems((prev) => prev.map((item) => ({ ...item, checked: false })));
  }

  function isEmpty() {
    return items.filter((i) => i.checked).length === 0;
  }

  const [isClicked, setIsClicked] = useState(false)

  function toggleClicked () {
    setIsClicked(prev => !prev)
  }

  function updateItems() {
    items.forEach(i => 
      fetch(URL + `/items/${i.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          item: {
            checked: i.checked
          }
        }),
      })
    )
  }

  useEffect(updateItems, [isClicked])

  return (
    <>
      {isEmpty() ? (
        <View style={styles.noItems}>
          <Text>Your Bag Is Empty</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <ListItems
            items={items.filter((i) => i.checked)}
            handleCheck={removeOneItem}
          />
          <TouchableOpacity style={styles.button} onPress={emptyBag}>
            <Text style={styles.empty}>Empty</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  noItems: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    margin: 20,
  },
  empty: {
    color: "red",
  },
});

export default MyBagPage;
