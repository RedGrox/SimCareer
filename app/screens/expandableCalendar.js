import _ from "lodash";
import React, { Component } from "react";
import {
  Platform,
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
} from "react-native-calendars";

const today = new Date().toISOString().split("T")[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);
const themeColor = "#00AAAF";
const lightThemeColor = "#EBF9F9";

function getFutureDates(days) {
  const array = [];
  for (let index = 1; index <= days; index++) {
    const date = new Date(Date.now() + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split("T")[0];
    array.push(dateString);
  }
  return array;
}

function getPastDate(days) {
  return new Date(Date.now() - 864e5 * days).toISOString().split("T")[0];
}

async function getDates() {
  const response = await fetch(
    "http://192.168.1.117:3000/campionati/dateUt/" + global.user.id,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}

export default class ExpandableCalendarScreen extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
    getDates().then((dates) => {
      this.setDates(dates);
    });
  }

  setDates = (dates) => {
    this.setState({ items: dates });
  };
  onDateChanged = (/* date, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
  };

  onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  };

  buttonPressed() {
    Alert.alert("show more");
  }

  itemPressed(id) {
    Alert.alert(id);
  }

  renderEmptyItem() {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned</Text>
      </View>
    );
  }

  renderItem = ({ item }) => {
    if (_.isEmpty(item)) {
      return this.renderEmptyItem();
    }

    return (
      <TouchableOpacity
        onPress={() => this.itemPressed(item.title)}
        style={styles.item}
      >
        <View style={styles.hourView}>
          <Text style={styles.itemHourText}>{item.ora}</Text>
        </View>
        <Text style={styles.itemTitleText}>{item.title}</Text>
        <View style={styles.champView}>
          <Text style={styles.itemTitleText}>{item.campionato}</Text>
          <Text>{item.circuito}</Text>
        </View>
        <View style={styles.wheaterView}>
          {Object.keys(item.meteo).length !== 0 ? (
            <Image
              style={styles.raceMeteoImage}
              source={{
                uri:
                  "http://openweathermap.org/img/wn/" +
                  item.meteo.icon +
                  "@4x.png",
              }}
            />
          ) : (
            <View />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  getMarkedDates = () => {
    const marked = {};
    this.state.items.forEach((item) => {
      // NOTE: only mark dates with data
      if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
        marked[item.title] = { marked: true };
      } else {
        marked[item.title] = { disabled: true };
      }
    });
    return marked;
  };

  getTheme = () => {
    const disabledColor = "grey";

    return {
      // arrows
      arrowColor: "black",
      arrowStyle: { padding: 0 },
      // month
      monthTextColor: "black",
      textMonthFontSize: 16,
      textMonthFontFamily: "HelveticaNeue",
      textMonthFontWeight: "bold",
      // day names
      textSectionTitleColor: "black",
      textDayHeaderFontSize: 12,
      textDayHeaderFontFamily: "HelveticaNeue",
      textDayHeaderFontWeight: "normal",
      // dates
      dayTextColor: themeColor,
      textDayFontSize: 18,
      textDayFontFamily: "HelveticaNeue",
      textDayFontWeight: "500",
      textDayStyle: { marginTop: Platform.OS === "android" ? 2 : 4 },
      // selected date
      selectedDayBackgroundColor: themeColor,
      selectedDayTextColor: "white",
      // disabled date
      textDisabledColor: disabledColor,
      // dot (marked date)
      dotColor: themeColor,
      selectedDotColor: "white",
      disabledDotColor: disabledColor,
      dotStyle: { marginTop: -2 },
    };
  };

  date_diff_indays = function (date1, date2) {
    let dt1 = new Date(date1);
    let dt2 = new Date(date2);
    return Math.abs(
      Math.floor(
        (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
          Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
          (1000 * 60 * 60 * 24)
      )
    );
  };

  getClosestDate = () => {
    let closestDate = {
      diff: this.date_diff_indays(this.state.items[0].title, today),
      index: 0,
    };
    for (let i = 1; i < this.state.items.length; i++) {
      let tmp = {
        diff: this.date_diff_indays(this.state.items[i].title, today),
        index: i,
      };
      if (closestDate.diff > tmp.diff) {
        closestDate = tmp;
      } else {
        return closestDate.index;
      }
    }
    return closestDate.index;
  };

  //date={this.state.items.length == 0 ? today : this.state.items[this.getClosestDate()].title}
  render() {
    return (
      <CalendarProvider
        testID={"expandableCalendar"}
        date={today}
        onDateChanged={this.onDateChanged}
        onMonthChange={this.onMonthChange}
        showTodayButton
        disabledOpacity={0.6}
        style={styles.screen}
        // theme={{
        //   todayButtonTextColor: themeColor
        // }}
        // todayBottomMargin={16}
      >
        {this.props.weekView ? (
          <WeekCalendar
            testID={"expandableCalendar"}
            firstDay={1}
            markedDates={this.getMarkedDates()}
          />
        ) : (
          <ExpandableCalendar
            testID={"expandableCalendar"}
            // horizontal={false}
            // hideArrows
            // disablePan
            // hideKnob
            initialPosition={ExpandableCalendar.positions.OPEN}
            // calendarStyle={styles.calendar}
            // headerStyle={styles.calendar} // for horizontal only
            // disableWeekScroll
            // theme={this.getTheme()}
            disableAllTouchEventsForDisabledDays
            firstDay={1}
            markedDates={this.getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
            leftArrowImageSource={require("../assets/previous.png")}
            rightArrowImageSource={require("../assets/next.png")}
          />
        )}
        <AgendaList
          testID={"expandableCalendar"}
          sections={this.state.items}
          extraData={this.state}
          renderItem={this.renderItem}
          initialNumToRender={this.state.items.length + 1}
          // sectionStyle={styles.section}
        />
      </CalendarProvider>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    paddingTop: StatusBar.currentHeight,
  },
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  champView: {
    flex: 2,
    alignContent: "center",
    alignItems: "center",
  },
  hourView: {
    flex: 1,
    alignItems: "center",
  },
  section: {
    backgroundColor: lightThemeColor,
    color: "grey",
    textTransform: "capitalize",
  },
  item: {
    padding: 20,
    backgroundColor: "#c2c2c2",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemHourText: {
    color: "black",
  },
  itemDurationText: {
    color: "grey",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: "black",

    fontWeight: "bold",
    fontSize: 16,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  emptyItemText: {
    color: "lightgrey",
    fontSize: 14,
  },
  raceMeteoImage: { height: 50, width: 50 },
  wheaterView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
