import React, { useContext } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ChampionshipsContext,
  ChampionshipsProvider,
} from "../config/provider/ChampionshipsProvider";

const BASE_LINK = "http://192.168.1.117:3000/img/";

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

const FilledStar = (id) => {
  const champ = useContext(ChampionshipsContext);
  let removePref = (id) => {
    removePrefRequest(id).then(() => {
      champ.setUpdateBoolean(true);
    });
  };
  return (
    <TouchableOpacity onPress={() => removePref(id)}>
      <Image style={styles.star} source={require("../assets/star-black.png")} />
    </TouchableOpacity>
  );
};

const VoidStar = (id) => {
  const champ = useContext(ChampionshipsContext);
  let addPref = (id) => {
    addPrefRequest(id).then(() => {
      champ.setUpdateBoolean(true);
    });
  };
  return (
    <TouchableOpacity onPress={() => addPref(id)}>
      <Image style={styles.star} source={require("../assets/star-white.png")} />
    </TouchableOpacity>
  );
};

const ItemChampionship = ({ title, logo, partecipanti, id, pref }) => {
  const champ = useContext(ChampionshipsContext);
  return (
    <View style={styles.item}>
      <View style={styles.logo}>
        <Image
          style={styles.img}
          resizeMode="cover"
          source={{ uri: BASE_LINK + logo }}
        />
      </View>
      <View style={styles.textArea}>
        <Text style={styles.title}>{title}</Text>
        <Text>{partecipanti}/24</Text>
      </View>
      <View style={styles.starView}>
        {champ.pref.includes(parseInt(id, 10)) ? (
          <FilledStar id={id} />
        ) : (
          <VoidStar id={id} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    flex: 1,
    borderRadius: 50,
    width: 75,
    height: 75,
  },
  item: {
    flex: 1,
    height: 100,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  logo: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 75,
    height: 75,
    marginLeft: 10,
  },
  star: {
    width: 35,
    height: 35,
  },
  starView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textArea: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 17,
  },
});

export { ItemChampionship };
