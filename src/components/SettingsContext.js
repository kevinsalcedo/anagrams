import { useState, createContext } from "react";
import {
  getEasyModeSetting,
  getThemeSetting,
  toggleThemeSetting,
  toggleEasyModeSetting,
} from "../utils/settingsUtils";

export const SettingsContext = createContext({
  settings: {
    easyMode: getEasyModeSetting(),
    theme: getThemeSetting(),
  },
  toggleEasyMode: toggleEasyModeSetting,
  toggleTheme: toggleThemeSetting,
});

export const SettingsContextProvider = (props) => {
  const toggleEasyMode = () => {
    toggleEasyModeSetting();
    setState({
      ...state,
      settings: { ...state.settings, easyMode: getEasyModeSetting() },
    });
  };

  const toggleTheme = () => {
    toggleThemeSetting();
    setState({
      ...state,
      settings: { ...state.settings, theme: getThemeSetting() },
    });
  };

  const initState = {
    settings: {
      easyMode: getEasyModeSetting(),
      theme: getThemeSetting(),
    },
    toggleEasyMode: toggleEasyMode,
    toggleTheme: toggleTheme,
  };

  const [state, setState] = useState(initState);

  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  );
};
