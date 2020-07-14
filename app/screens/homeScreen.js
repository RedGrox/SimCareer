import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ({ navigation }) => {
  return (
    <View style={styles.background}>
      <Button
        title="button"
        onPress={() => navigation.push("ChampionshipScreen")}
      ></Button>
    </View>
  );
};
