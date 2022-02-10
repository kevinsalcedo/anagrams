import { common_sevens } from "./assets/common_sevens.js";

export function getWordList(listName) {
  if (listName === "sevens") {
    return common_sevens;
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
export function getListData(listName) {
  const words = getWordList(listName);
  let data = getSavedData();

  let listData = data[listName];
  // First initialization
  if (!listData) {
    const newListData = {
      completed: [],
      attempts: 0,
    };
    listData = newListData;
    data[listName] = newListData;
    saveData(data);
  }

  // Get actual words from saved indices
  let completedWords = [];
  if (listData.completed) {
    for (let i = 0; i < listData.completed.length; i++) {
      completedWords.push(words[listData.completed[i]]);
    }
  }

  // Return list of actual completed words, and number of attempts
  return {
    completed: completedWords,
    attempts: listData.attempts,
  };
}

// Get a new word from the list
// Returns - JSON object containing word and index in list
export function getWord(listName) {
  let list = getWordList(listName);
  let idx = Math.floor(Math.random() * list.length + 1);

  // Make sure that the word we generate is new
  let completedWords = getListData(listName).completed;
  if (completedWords) {
    while (completedWords.includes(idx)) {
      idx = Math.floor(Math.random() * list.length + 1);
    }
  }

  // Return object with index + word so that it can be marked complete
  return {
    index: idx,
    word: list[idx],
  };
}

// Save index and number of attempts of completed anagram to given list
// Returns - nothing
export function markWordCompleted(listName, index, numAttempts) {
  const listData = getListData(listName);

  let newListData = {
    completed: [...listData.completed, index],
    attempts: listData.attempts + numAttempts,
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
    attempts: 0,
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
