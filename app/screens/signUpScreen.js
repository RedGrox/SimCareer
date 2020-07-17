import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Dimensions,
  StatusBar,
  Image,
  TextInput,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";

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
  textInput: {
    alignItems: "center",
    width: Dimensions.get("window").width * 0.7,
    height: 40,
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
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
});

const ReviewSchema = yup.object({
  mail: yup
    .string()
    .required("Il campo è obbligatorio")
    .email("Inserire una mail valida"),
  password: yup.string().required("Il campo è obbligatorio").min(4),
  repeatPsw: yup
    .string()
    .required("Il campo è obbligatorio")
    .oneOf([yup.ref("password"), null], "Le Passwords devono coincidere"),
  nome: yup
    .string()
    .required("Il campo è obbligatorio")
    .matches(/[::alpha::]/, "Inserire solo lettere"),
  cognome: yup
    .string()
    .required("Il campo è obbligatorio")
    .matches(/[a-zA-Z]/, "Inserire solo lettere"),
  residenza: yup.string(),
});

export default ({ navigation }) => {
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
            <View style={{ flex: 0.5, paddingTop: StatusBar.currentHeight }}>
              <Image
                style={{
                  flex: 1,
                  resizeMode: "contain",
                }}
                source={require("../assets/bdLogo.png")}
              />
            </View>
            <View style={{ flex: 2 }}>
              <Formik
                initialValues={{
                  mail: "",
                  password: "",
                  repeatPsw: "",
                  nome: "",
                  cognome: "",
                  dataNascita: "",
                  residenza: "",
                }}
                validationSchema={ReviewSchema}
                onSubmit={(values) => {
                  console.log(values);
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
                    <TextInput
                      style={styles.textInput}
                      placeholder="Ripeti password"
                      secureTextEntry={true}
                      onChangeText={props.handleChange("repeatPsw")}
                      value={props.values.repeatPsw}
                      onBlur={props.handleBlur("repeatPsw")}
                    ></TextInput>
                    <Text style={styles.textErr}>
                      {props.touched.repeatPsw && props.errors.repeatPsw}
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Nome"
                      onChangeText={props.handleChange("nome")}
                      value={props.values.nome}
                      onBlur={props.handleBlur("nome")}
                    ></TextInput>
                    <Text style={styles.textErr}>
                      {props.touched.nome && props.errors.nome}
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Cognome"
                      onChangeText={props.handleChange("cognome")}
                      value={props.values.cognome}
                      onBlur={props.handleBlur("cognome")}
                    ></TextInput>
                    <Text style={styles.textErr}>
                      {props.touched.cognome && props.errors.cognome}
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Data di nascita"
                      onChangeText={props.handleChange("dataNascita")}
                      value={props.values.dataNascita}
                      onBlur={props.handleBlur("dataNascita")}
                    ></TextInput>
                    <Text style={styles.textErr}>
                      {props.touched.cognome && props.errors.cognome}
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Residenza"
                      onChangeText={props.handleChange("residenza")}
                      value={props.values.residenza}
                      onBlur={props.handleBlur("residenza")}
                    ></TextInput>
                    <Text style={styles.textErr}>
                      {props.touched.residenza && props.errors.residenza}
                    </Text>
                    <Button
                      title="Registrati"
                      onPress={props.handleSubmit}
                    ></Button>
                  </View>
                )}
              </Formik>
            </View>
            <View
              style={{
                flex: 0.5,
                flexDirection: "column-reverse",
                justifyContent: "flex-start",
              }}
            >
              <Image
                style={{ height: 30 }}
                source={require("../assets/longArrowSx.png")}
              ></Image>
              <Text>Scorri verso destra per il login</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};
