export function saveSettings(data) {
  localStorage.setItem("anagramSettings", JSON.stringify(data));
}

export function getSettings() {
  let anagramSettings = localStorage.getItem("anagramSettings");

  if (anagramSettings) {
    return JSON.parse(anagramSettings);
  }

  anagramSettings = {
    easyMode: true,
    theme: "light",
  };

  saveSettings(anagramSettings);
  return anagramSettings;
}

export function getEasyModeSetting() {
  const settings = getSettings();

  if (settings.hasOwnProperty("easyMode")) {
    return settings.easyMode;
  }

  return false;
}

export function toggleEasyModeSetting() {
  let settings = { ...getSettings() };

  settings["easyMode"] = settings.hasOwnProperty("easyMode")
    ? !settings["easyMode"]
    : false;
  saveSettings(settings);
}

export function getThemeSetting() {
  const settings = getSettings();

  if (settings.hasOwnProperty("theme")) {
    return settings.theme;
  }

  return "light";
}

export function toggleThemeSetting() {
  let settings = { ...getSettings() };

  const currTheme = settings.hasOwnProperty("theme") ? settings.theme : "light";

  settings["theme"] = currTheme === "light" ? "dark" : "light";
  saveSettings(settings);
}
