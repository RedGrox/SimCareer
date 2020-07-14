import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
function championshipScreen({ navigation }) {
  return (
    <View style={styles.background}>
      <Text>championship Screen</Text>
      <Button
        title="Race"
        onPress={() => navigation.push("RaceScreen")}
      ></Button>
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default championshipScreen;
