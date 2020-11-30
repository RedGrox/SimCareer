import React, { useState } from "react";

const ChampionshipsContext = React.createContext();

const ChampionshipsProvider = (props) => {
  const [champData, setChampData] = useState([]);
  const [pref, setPref] = useState([]);
  const [need2Update, setUpdate] = useState(true);

  const setAll = (data) => {
    setChampData(data.campionati);
    setPref(data.pref);
    setUpdate(false);
  };
  const setUpdateBoolean = (bool) => {
    setUpdate(bool);
  };
  return (
    <ChampionshipsContext.Provider
      value={{ champData, pref, need2Update, setAll, setUpdateBoolean }}
    >
      {props.children}
    </ChampionshipsContext.Provider>
  );
};

export { ChampionshipsContext, ChampionshipsProvider };
