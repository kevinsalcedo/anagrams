import { getDay } from "./wordUtils";

export function saveUserPreferences(data) {
  localStorage.setItem("anagramSettings", JSON.stringify(data));
}

export function getUserPreferences() {
  let anagramSettings = localStorage.getItem("anagramSettings");

  if (anagramSettings) {
    return JSON.parse(anagramSettings);
  }

  anagramSettings = {
    easyMode: false,
    theme: "light",
    firstVisit: -1,
  };

  saveUserPreferences(anagramSettings);
  return anagramSettings;
}

export function getFirstVisit() {
  return getUserPreferences().firstVisit;
}

export function markFirstVisit() {
  let prefs = { ...getUserPreferences() };
  if (getFirstVisit() < 0) {
    prefs.firstVisit = getDay();
    saveUserPreferences(prefs);
  }
}

export function isEasyMode() {
  const settings = getUserPreferences();

  if (settings.hasOwnProperty("easyMode")) {
    return settings.easyMode;
  }

  return false;
}

export function setEasyMode(val) {
  let settings = { ...getUserPreferences() };

  settings["easyMode"] = val;
  saveUserPreferences(settings);
}

export function getTheme() {
  const settings = getUserPreferences();

  if (settings.hasOwnProperty("theme")) {
    return settings.theme;
  }

  return "light";
}

export function toggleTheme() {
  let settings = { ...getUserPreferences() };

  const currTheme = settings.hasOwnProperty("theme") ? settings.theme : "light";

  settings["theme"] = currTheme === "light" ? "dark" : "light";
  saveUserPreferences(settings);
}

const GAME_SETTINGS = {
  sevens: {
    WORD_SIZE: 7,
  },
  eights: {
    WORD_SIZE: 8,
  },
  nines: {
    WORD_SIZE: 9,
  },
};

const ARCHIVED_PREFIX = "archived-";

export function getGameSettings(name) {
  if (name.includes(ARCHIVED_PREFIX)) {
    name = name.split("-")[1];
  }
  return GAME_SETTINGS[name];
}
