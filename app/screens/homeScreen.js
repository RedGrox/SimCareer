import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  FlatList,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  background2: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
  hidden: {},
  item: {
    height: 100,
    width: Dimensions.get("window").width * 0.9,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  logo: {
    flex: 1,
    borderRadius: 360,
    marginRight: 50,
    backgroundColor: "red",
    width: 50,
    height: 50,
    borderColor: "black",
    borderWidth: 1,
  },
  star: {
    width: 35,
    height: 35,
  },
  starView: {
    flex: 1,
    justifyContent: "center",
    //alignContent:"center",
    alignItems: "center",
  },
  textArea: {
    flex: 2,
    flexDirection: "column",
    backgroundColor: "white",
    borderColor: "red",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
  },
});

const HomeScreenTab = createMaterialTopTabNavigator();
const HomeScreen = () => (
  <HomeScreenTab.Navigator style={{ paddingTop: StatusBar.currentHeight }}>
    <HomeScreenTab.Screen
      name="All"
      component={AllChampionships}
    ></HomeScreenTab.Screen>
    <HomeScreenTab.Screen
      name="Pref"
      component={PrefChampionships}
    ></HomeScreenTab.Screen>
  </HomeScreenTab.Navigator>
);

async function Data() {
  const response = await fetch("http://192.168.1.117:3000/campionati", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ arg: [], idUt: global.user.id }),
  });
  const data = await response.json();
  return data;
}
async function addPrefRequest(id) {
  const response = await fetch(
    "http://192.168.1.117:3000/campionati/addPref/",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idChamp: id, idUt: global.user.id }),
    }
  );
  return response;
}

async function removePrefRequest(id) {
  const response = await fetch(
    "http://192.168.1.117:3000/campionati/removePref/",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idChamp: id, idUt: global.user.id }),
    }
  );
  return response;
}

const AllChampionships = ({ navigation }) => {
  const [championshipData, setChampionshipData] = React.useState({
    data: [],
    pref: [],
    needToUpdate: true,
  });

  let setData = (requestedData) => {
    setChampionshipData({
      data: requestedData.campionati,
      pref: requestedData.pref,
      needToUpdate: false,
    });
  };

  let setNeedToUpdate = () => {
    setChampionshipData({ needToUpdate: true });
  };

  let addPref = (id) => {
    addPrefRequest(id).then(() => {
      setNeedToUpdate();
    });
  };

  let removePref = (id) => {
    removePrefRequest(id).then(() => {
      setNeedToUpdate();
    });
  };

  const VoidStar = (id) => (
    <TouchableOpacity onPress={() => addPref(id)}>
      <Image style={styles.star} source={require("../assets/star-white.png")} />
    </TouchableOpacity>
  );

  const FilledStar = (id) => (
    <TouchableOpacity onPress={() => removePref(id)}>
      <Image style={styles.star} source={require("../assets/star-black.png")} />
    </TouchableOpacity>
  );

  const ItemChampionship = ({ title, logo, partecipanti, id, pref }) => (
    <View style={styles.item}>
      <View style={styles.logo}></View>
      <View style={styles.textArea}>
        <Text>{title}</Text>
        <Text>{partecipanti}/24</Text>
      </View>
      <View style={styles.starView}>
        {pref.includes(parseInt(id, 10)) ? (
          <FilledStar id={id} />
        ) : (
          <VoidStar id={id} />
        )}
      </View>
    </View>
  );
  const renderItem = ({ item }) => (
    <ItemChampionship
      title={item.nome}
      logo={"logo"}
      partecipanti={item.pilotiIscritti.length}
      id={item.id}
      pref={championshipData.pref}
    />
  );

  if (championshipData.needToUpdate == true) {
    Data().then((data) => {
      setData(data);
    });
  }
  return (
    <View style={styles.background}>
      <FlatList
        data={championshipData.data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
/* <Button title="Championship"
        onPress={() => navigation.push("ChampionshipScreen")}></Button> */
const PrefChampionships = ({ navigation }) => {
  const [championshipData, setChampionshipData] = React.useState({
    data: [],
    pref: [],
    needToUpdate: true,
  });
  let setData = (requestedData) => {
    setChampionshipData({
      data: requestedData.campionati,
      pref: requestedData.pref,
      needToUpdate: false,
    });
  };
  let setNeedToUpdate = () => {
    setChampionshipData({ needToUpdate: true });
  };
  let addPref = (id) => {
    addPrefRequest(id).then(() => {
      setNeedToUpdate();
    });
  };

  let removePref = (id) => {
    removePrefRequest(id).then(() => {
      setNeedToUpdate();
    });
  };

  const VoidStar = (id) => (
    <TouchableOpacity onPress={() => addPref(id)}>
      <Image style={styles.star} source={require("../assets/star-white.png")} />
    </TouchableOpacity>
  );

  const FilledStar = (id) => (
    <TouchableOpacity onPress={() => removePref(id)}>
      <Image style={styles.star} source={require("../assets/star-black.png")} />
    </TouchableOpacity>
  );

  const ItemChampionship = ({ title, logo, partecipanti, id, pref }) => (
    <View style={styles.item}>
      <View style={styles.logo}></View>
      <View style={styles.textArea}>
        <Text>{title}</Text>
        <Text>{partecipanti}/24</Text>
      </View>
      <View style={styles.starView}>
        {pref.includes(parseInt(id, 10)) ? (
          <FilledStar id={id} />
        ) : (
          <VoidStar id={id} />
        )}
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <View>
      {championshipData.pref.includes(parseInt(item.id, 10)) ? (
        <ItemChampionship
          title={item.nome}
          logo={"logo"}
          partecipanti={item.pilotiIscritti.length}
          id={item.id}
          pref={championshipData.pref}
        />
      ) : (
        <View></View>
      )}
    </View>
  );

  if (championshipData.needToUpdate == true) {
    Data().then((data) => {
      setData(data);
    });
  }
  return (
    <View style={styles.background2}>
      <FlatList
        data={championshipData.data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
/*  */

export default ({ navigation }) => {
  return <HomeScreen />;
};
