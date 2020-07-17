import React, { useState } from "react";
import { CommonActions } from "@react-navigation/native";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TextInput,
  StatusBar,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Formik } from "formik";
import * as yup from "yup";

import SignUpScreen from "../screens/signUpScreen";

const TabNav = createMaterialTopTabNavigator();
const TabNavScreen = () => (
  <TabNav.Navigator
    tabBarPosition="bottom"
    tabBarOptions={{ showLabel: "false", style: { height: 0, width: 0 } }}
  >
    <TabNav.Screen name="signIn" component={signInScreen}></TabNav.Screen>
    <TabNav.Screen name="signUp" component={SignUpScreen}></TabNav.Screen>
  </TabNav.Navigator>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#ebeae1",
  },
  alignViewContent: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ebeae1",
    alignItems: "center",
    justifyContent: "center",
  },
  fl: {
    flex: 1,
  },
  mailPswView: {
    backgroundColor: "#fca9a9",
    borderColor: "red",
    borderRadius: 5,
    borderWidth: 2,
    marginBottom: 10,
  },
  textInput: {
    alignItems: "center",
    width: Dimensions.get("window").width * 0.7,
    height: 50,
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 1,
    fontSize: 18,
    padding: 10,
    marginTop: 3,
  },
  textErr: {
    color: "red",
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 10,
    textAlign: "center",
  },
});

const RewiewSchema = yup.object({
  mail: yup.string().required().email(),
  password: yup.string().required().min(3),
});

const signInScreen = ({ navigation }) => {
  const [mailPsw, setMailPsw] = useState(false);
  const badStatus = () => {
    setMailPsw(true);
  };
  const goodStatus = () => {
    setMailPsw(false);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.background}>
        <ScrollView
          contentContainerStyle={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
        >
          <View style={styles.alignViewContent}>
            <View style={(styles.fl, { flex: 2 })}>
              <View style={{ paddingTop: StatusBar.currentHeight }}>
                <Image
                  style={{ flex: 1, resizeMode: "contain" }}
                  source={require("../assets/bdLogo.png")}
                />
              </View>
            </View>
            <View style={styles.fl}>
              <View style={mailPsw ? styles.mailPswView : { display: "none" }}>
                <Text>Mail o password errate</Text>
              </View>
              <Formik
                initialValues={{ mail: "", password: "" }}
                validationSchema={RewiewSchema}
                onSubmit={(values) => {
                  fetch("http://192.168.1.117:3000/utenti/login", {
                    method: "POST",
                    dataType: "json",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      mail: values.mail,
                      password: values.password,
                    }),
                  })
                    .then((response) => {
                      if (response.status === 200) {
                        setMailPsw(false);
                        return response.json();
                      } else {
                        setMailPsw(true);
                      }
                    })
                    .then((response) => {
                      if (response) {
                        global.user = response;
                        navigation.dispatch(
                          CommonActions.reset({
                            index: 0,
                            routes: [{ name: "AppTabs" }],
                          })
                        );
                      }
                    });
                }}
              >
                {(props) => (
                  <View style={{ flex: 1, justifyContent: "space-evenly" }}>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Mail"
                      onChangeText={props.handleChange("mail")}
                      value={props.values.mail}
                      onBlur={props.handleBlur("mail")}
                    ></TextInput>
                    <Text style={styles.textErr}>
                      {props.touched.mail && props.errors.mail}
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Password"
                      secureTextEntry={true}
                      onChangeText={props.handleChange("password")}
                      value={props.values.password}
                      onBlur={props.handleBlur("password")}
                    ></TextInput>
                    <Text style={styles.textErr}>
                      {props.touched.password && props.errors.password}
                    </Text>
                    <Button title="LogIn" onPress={props.handleSubmit}></Button>
                  </View>
                )}
              </Formik>
            </View>
            <View style={styles.fl}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column-reverse",
                  justifyContent: "flex-start",
                }}
              >
                <Image
                  style={{ height: 30 }}
                  source={require("../assets/longArrow.png")}
                ></Image>
                <Text>Scorri a destra per la registrazione</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ({ navigation }) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const handlePress = () => {
    setButtonClicked(true);
  };
  const setFalse = () => {
    setButtonClicked(false);
  };
  return <TabNavScreen />;
};
