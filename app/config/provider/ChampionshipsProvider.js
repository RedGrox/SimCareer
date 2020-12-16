import React, { useState } from "react";

const ChampionshipsContext = React.createContext();

const ChampionshipsProvider = (props) => {
  const [champData, setChampData] = useState([]);
  const [pref, setPref] = useState([]);
  const [need2Update, setUpdate] = useState(true);
  const [singleChampionship, setChamp] = useState({});
  const [singleRace, setRace] = useState({});

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
      value={{
        champData,
        pref,
        need2Update,
        singleChampionship,
        singleRace,
        setAll,
        setUpdateBoolean,
        setChamp,
        setRace,
      }}
    >
      {props.children}
    </ChampionshipsContext.Provider>
  );
};

export { ChampionshipsContext, ChampionshipsProvider };
