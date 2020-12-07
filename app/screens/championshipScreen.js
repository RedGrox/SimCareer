import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  LogBox,
} from "react-native";
import { ChampionshipsContext } from "../config/provider/ChampionshipsProvider";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Accordion from "react-native-collapsible/Accordion";

const BASE_LINK = "http://192.168.1.117:3000/img/";

async function getCircuiti(arg) {
  const response = await fetch(
    "http://192.168.1.117:3000/circuiti/getCircuiti/",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ arg: arg }),
    }
  );
  const data = await response.json();
  return data;
}

async function getClassifica(idCampionato) {
  const response = await fetch(
    "http://192.168.1.117:3000/classifiche/getClassifica/",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ arg: [idCampionato] }),
    }
  );
  const data = await response.json();
  return data;
}

function championshipScreen({ route, navigation }) {
  const context = useContext(ChampionshipsContext);
  const thisChamp = context.champData[route.params.idCampionato];
  useEffect(() => {
    let arg = [];
    for (let i = 0; i < thisChamp.calendario.length; i++) {
      arg.push(thisChamp.calendario[i].idCircuito);
    }
    if (arg.length > 0) {
      getCircuiti(arg).then((circuiti) => {
        updateChamp(circuiti);
        context.setChamp(thisChamp);
      });
    } else {
      context.setChamp(thisChamp);
    }
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const updateChamp = (circuiti) => {
    for (let i = 0; i < thisChamp.calendario.length; i++) {
      thisChamp.calendario[i].nome = circuiti[i].nome;
      thisChamp.calendario[i].nazione = circuiti[i].nazione;
      thisChamp.calendario[i].logoNazione = circuiti[i].logoNazione;
      thisChamp.calendario[i].logo = circuiti[i].logo;
      thisChamp.calendario[i].lunghezza = circuiti[i].lunghezza;
    }
  };
  return (
    <View style={styles.background}>
      <HeaderChampionship navigation={navigation} />
      <BodyChampionship
        navigation={navigation}
        idCampionato={route.params.idCampionato}
      />
    </View>
  );
}

const HeaderChampionship = ({ navigation }) => {
  const context = useContext(ChampionshipsContext);

  const imRegistered = (idUt) => {
    if (Object.keys(context.singleChampionship).length !== 0) {
      //prettier-ignore
      for (let i = 0;i < context.singleChampionship.pilotiIscritti.length;i++) {
        if (
          parseInt(context.singleChampionship.pilotiIscritti[i].idUt, 10) ===
          parseInt(idUt, 10)
        ) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backTouchable}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Campionati</Text>
        <Image
          style={styles.backArrow}
          source={require("../assets/backArrow.png")}
        ></Image>
      </TouchableOpacity>
      <View style={styles.logoView}>
        <Image
          style={styles.logoImage}
          source={{ uri: BASE_LINK + context.singleChampionship.logo }}
        ></Image>
      </View>
      <View style={styles.infoView}>
        <Text style={styles.infoTitle}>{context.singleChampionship.nome}</Text>
        {imRegistered(global.user.id) ? (
          <Button title="Disiscriviti"></Button>
        ) : (
          <Button title="Iscriviti"></Button>
        )}
      </View>
    </View>
  );
};

const BodyChampTab = createMaterialTopTabNavigator();

const BodyTab = ({ navigation, idCampionato }) => {
  return (
    <BodyChampTab.Navigator>
      <BodyChampTab.Screen
        name="Gare"
        component={RaceTab}
      ></BodyChampTab.Screen>
      <BodyChampTab.Screen
        name="Classifiche"
        component={ChartTab}
        initialParams={{ idCampionato }}
      ></BodyChampTab.Screen>
      <BodyChampTab.Screen
        name="Info"
        component={InfoTab}
      ></BodyChampTab.Screen>
    </BodyChampTab.Navigator>
  );
};

const RaceTab = () => {
  const context = useContext(ChampionshipsContext);
  const renderItem = ({ item }) => {
    return <RaceItem item={item} />;
  };
  return (
    <View>
      <FlatList
        data={context.singleChampionship.calendario}
        renderItem={renderItem}
        keyExtractor={(item) => item.seq}
      />
    </View>
  );
};

/* <Text style={styles.raceInfoPlace}>{item.nazione}</Text> */
const RaceItem = ({ item }) => {
  let date = new Date(item.data);
  let formattedDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  return (
    <View style={styles.raceItem}>
      <View style={styles.raceLogo}>
        <Image
          style={styles.raceLogoImage}
          source={{ uri: BASE_LINK + item.logo }}
        />
      </View>
      <View style={styles.raceInfo}>
        <View style={styles.raceTitleView}>
          <Text style={styles.raceInfoTitle}>{item.nome}</Text>
          <Image
            style={styles.logoNazione}
            source={{ uri: BASE_LINK + item.logoNazione }}
          />
        </View>
        <View style={styles.raceDateView}>
          <Text>{formattedDate}</Text>
          <Text>{item.ora}</Text>
        </View>
      </View>
      <View style={styles.raceMeteo}></View>
    </View>
  );
};

const ChartTab = ({ route }) => {
  const context = useContext(ChampionshipsContext);
  const [classifica, setClassifica] = useState([]);
  const [activeSections, setActiveSec] = useState([]);
  useEffect(() => {
    getClassifica(route.params.idCampionato).then((data) => {
      setClassifica([
        { id: 0, title: "Piloti", content: data[0].classificaPiloti },
        { id: 1, title: "Team", content: data[0].classificaTeam },
      ]);
    });
  }, []);

  const renderHeader = (section) => {
    return (
      <View style={styles.accordionHeader}>
        <Text style={styles.accordionTitle}>{section.title}</Text>
        {activeSections[0] == undefined || activeSections[0] != section.id ? (
          <Image
            style={styles.accordionArrow}
            source={require("../assets/down-arrow.png")}
          />
        ) : (
          <Image
            style={styles.accordionArrow}
            source={require("../assets/up-arrow.png")}
          />
        )}
      </View>
    );
  };

  const renderContent = (section) => {
    const renderItem = ({ item, index }) => {
      return <ChartItem item={item} index={index} />;
    };
    return (
      <View>
        <FlatList
          data={section.content}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>
    );
  };

  const updateSections = (activeSections) => {
    setActiveSec(activeSections);
  };
  return (
    <ScrollView>
      <Accordion
        sections={classifica}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={updateSections}
        touchableComponent={TouchableOpacity}
      />
    </ScrollView>
  );
};

const ChartItem = ({ item, index }) => {
  if (item.nome !== undefined) {
    return (
      <View
        style={[
          styles.chartItem,
          {
            backgroundColor:
              index == 0
                ? "#fce06d"
                : index == 1
                ? "#c4c4c4"
                : index == 2
                ? "#d49242"
                : "white",
          },
        ]}
      >
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            {index + 1}
          </Text>
        </View>
        <View style={styles.chartName}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>{item.nome}</Text>
          <Text style={{ fontSize: 10 }}>
            {item.team} - {item.auto}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text>{item.punti}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={[
          styles.chartItem,
          {
            backgroundColor:
              index == 0
                ? "#fce06d"
                : index == 1
                ? "#c4c4c4"
                : index == 2
                ? "#d49242"
                : "white",
          },
        ]}
      >
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            {index + 1}
          </Text>
        </View>
        <View style={styles.chartName}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>{item.team}</Text>
          <Text style={{ fontSize: 10 }}>{item.auto}</Text>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text>{item.punti}</Text>
        </View>
      </View>
    );
  }
};

const InfoTab = () => {
  return <View></View>;
};

const BodyChampionship = ({ navigation, idCampionato }) => {
  return (
    <View style={styles.body}>
      <BodyTab navigation={navigation} idCampionato={idCampionato} />
    </View>
  );
};

const styles = StyleSheet.create({
  accordionArrow: {
    height: 20,
    width: 20,
  },
  accordionHeader: {
    height: 50,
    width: Dimensions.get("window").width,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#a1a1ad",
  },
  accordionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    alignContent: "center",
  },
  backArrow: {
    zIndex: 100,
    position: "absolute",
    resizeMode: "contain",
    height: 25,
    width: 25,
    marginTop: 5,
    marginLeft: 5,
  },
  background: {
    flex: 1,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    flexDirection: "column",
    backgroundColor: "#d4d4d4",
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    fontSize: 20,
    fontWeight: "200",
    marginLeft: 35,
    marginTop: 3,
  },
  backTouchable: {
    zIndex: 100,
    position: "absolute",
    resizeMode: "contain",
    height: 35,
    width: 150,
    marginTop: 5,
    marginLeft: 5,
  },
  body: {
    flex: 2,
    width: Dimensions.get("window").width,
    backgroundColor: "#d3d3d3",
  },
  button: {},
  chartItem: {
    height: 75,
    width: Dimensions.get("window").width,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  chartName: {
    flex: 2,
    flexDirection: "column",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    width: Dimensions.get("window").width,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "white",
  },
  infoView: {
    flex: 2,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  logoImage: {
    resizeMode: "cover",
    height: Dimensions.get("window").height > 700 ? 150 : 100,
    width: Dimensions.get("window").height > 700 ? 150 : 100,
    marginLeft: 15,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "grey",
  },
  logoNazione: {
    height: 25,
    width: 25,
  },
  logoView: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: "8%",
  },
  raceDateView: { flexDirection: "row", justifyContent: "space-evenly" },
  raceInfo: {
    flex: 2,
    justifyContent: "space-evenly",
  },
  raceInfoTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  raceInfoPlace: {
    fontSize: 15,
    fontWeight: "700",
  },
  raceItem: {
    flexDirection: "row",
    backgroundColor: "#d3d3d3",
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  raceLogo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  raceLogoImage: { height: 75, width: 75, resizeMode: "contain" },
  raceMeteo: { flex: 0.7, backgroundColor: "green" },
  raceTitleView: { alignItems: "center" },
});
export default championshipScreen;
