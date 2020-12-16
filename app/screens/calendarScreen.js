import React from "react";
import { View, Text, StyleSheet, Button, Dimensions } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import TestCalendars from "../screens/testCalendars2";
import { LocaleConfig } from "react-native-calendars";
import ExpandableCalendar from "./expandableCalendar";
LocaleConfig.locales["it"] = {
  monthNames: [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre",
  ],
  monthNamesShort: [
    "Gen",
    "Feb",
    "Mar",
    "Apr",
    "Mag",
    "Giu",
    "Lug",
    "Ago",
    "Set",
    "Ott",
    "Nov",
    "Dic",
  ],
  dayNames: [
    "Domenica",
    "Lunedì",
    "Martedì",
    "Mercoledì",
    "Giovedì",
    "Venerdì",
    "Sabato",
  ],
  dayNamesShort: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
  today: "Oggi",
};
LocaleConfig.defaultLocale = "it";

function calendarScreen({ navigation }) {
  return <ExpandableCalendar></ExpandableCalendar>;
}
/*  */
const styles = StyleSheet.create({
  background: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,

    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    borderColor: "black",
    borderWidth: 1,
  },
});
export default calendarScreen;
