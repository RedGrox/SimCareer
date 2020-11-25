/*
registerScreens();
// eslint-disable-next-line no-console
console.ignoredYellowBox = ["Remote debugger"];
 */

/* LocaleConfig.locales["en"] = {
  formatAccessibilityLabel: "dddd d 'of' MMMM 'of' yyyy",
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["S", "M", "T", "W", "T", "F", "S"],
};

LocaleConfig.defaultLocale = "en";

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: "Menu",
              options: {
                topBar: {
                  title: {
                    text: "Wix RN Calendars",
                  },
                },
              },
            },
          },
        ],
      },
    },
  });
});
 */
import CalendarsScreen from "../screens/exampleCalendars/screens/calendars";
import AgendaScreen from "../screens/exampleCalendars/screens/agenda";
import CalendarsList from "../screens/exampleCalendars/screens/calendarsList";
import HorizontalCalendarList from "../screens/exampleCalendars/screens/horizontalCalendarList";
import ExpandableCalendar from "../screens/exampleCalendars/screens/expandableCalendar";
import TimelineCalendar from "../screens/exampleCalendars/screens/timelineCalendar";

export default ExpandableCalendar;
