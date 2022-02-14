import { common_sevens } from "../assets/common_sevens.js";
import { random_ten } from "../assets/random_ten";
import moment from "moment";

// TODO: Set to be the launch day
const FIRST_DAY = moment([2022, 1, 1]);

export function getDay() {
  let today = moment();
  return today.diff(FIRST_DAY, "days");
}

export function getWordList(listName) {
  if (listName === "sevens") {
    return common_sevens;
  } else if (listName === "eights") {
    return random_ten;
  }
  // TODO: add more lists
  return common_sevens;
}

function saveData(allData) {
  localStorage.setItem("anagrams", JSON.stringify(allData));
}

// Return parent data object for app
// Returns - JSON object of data
export function getSavedData() {
  let data = localStorage.getItem("anagrams");
  if (data) {
    data = JSON.parse(data);
  } else {
    // First initialization
    data = {};
    saveData(data);
  }
  return data;
}

// Return list data object for app
// Returns - JSON object of list data
export function getListData(listName, returnWords) {
  const words = getWordList(listName);
  let data = getSavedData();

  let listData = data[listName];
  // First initialization
  if (!listData) {
    const newListData = {
      completed: [],
    };
    listData = newListData;
    data[listName] = newListData;
    saveData(data);
  }

  // Get actual words from saved indices
  let completedWords = [];
  if (returnWords && listData.completed) {
    for (let i = 0; i < listData.completed.length; i++) {
      completedWords.push(words[listData.completed[i]]);
    }
  }

  // Return list of actual completed words, and number of attempts
  return {
    completed: returnWords ? completedWords : listData.completed,
  };
}

// Get a new word from the list
// Returns - JSON object containing word and index in list
export function getWord(listName, useArchive) {
  let list = getWordList(listName);
  let idx = getDay();

  // If useArchive is true, return a random index of the older
  if (useArchive) {
    idx = Math.floor(Math.random() * getDay());
  }

  // Return object with index + word so that it can be marked complete
  return {
    index: idx,
    word: list[idx],
  };
}

export function isWordCompleted(listName, index) {
  const data = getListData(listName, false).completed;
  return data.includes(index);
}

// Save index and number of attempts of completed anagram to given list
// Returns - nothing
export function markWordCompleted(listName, index) {
  const listData = getListData(listName, false);

  let newListData = {
    completed: [...listData.completed, index],
  };

  let newData = {
    ...getSavedData(),
  };
  newData[listName] = newListData;
  saveData(newData);
}

// Reset ALL saved anagram data
export function resetAllData() {
  saveData({});
}

// Reset saved anagram data for a given list
export function resetDataForList(listName) {
  let newListData = {
    completed: [],
  };

  let newData = {
    ...getSavedData(),
  };
  newData[listName] = newListData;

  saveData(newData);
}

/*
Localstorage data structure:

data: {
  listName1: {
    completed: [0,1,...],
    attempts: 5
  },
  listName2: {
    completed: [5,7,...],
    attempts: 25
  }
}
*/
