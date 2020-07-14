import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

function userDetailScreen({ navigation }) {
  return (
    <View style={styles.background}>
      <Text>user Screen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default userDetailScreen;
