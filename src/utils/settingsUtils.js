export function saveUserPreferences(data) {
  localStorage.setItem("anagramSettings", JSON.stringify(data));
}

export function getUserPreferences() {
  let anagramSettings = localStorage.getItem("anagramSettings");

  if (anagramSettings) {
    return JSON.parse(anagramSettings);
  }

  anagramSettings = {
    easyMode: true,
    theme: "light",
  };

  saveUserPreferences(anagramSettings);
  return anagramSettings;
}

export function isEasyMode() {
  const settings = getUserPreferences();

  if (settings.hasOwnProperty("easyMode")) {
    return settings.easyMode;
  }

  return false;
}

export function toggleEasyMode() {
  let settings = { ...getUserPreferences() };

  settings["easyMode"] = settings.hasOwnProperty("easyMode")
    ? !settings["easyMode"]
    : false;
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
  "sevens" : {
    WORD_SIZE: 7,
  },
  "eights" : {
    WORD_SIZE: 8
  }
}

export function getGameSettings(name) {
  return GAME_SETTINGS[name];
}