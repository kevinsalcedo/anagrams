import { seven_hints } from "../assets/seven_hints";
import { eights_hints } from "../assets/eight_hints";
import { nine_hints } from "../assets/nine_hints";
import moment from "moment";

// TODO: Set to be the launch day
export const FIRST_DAY = moment([2022, 0, 1]);

// Get the current day's index
export function getDay() {
  let today = moment();
  return today.diff(FIRST_DAY, "days");
}

// Get the day index of the given date
export function getDayDiff(date) {
  return moment(date).diff(FIRST_DAY, "days");
}

// Get the date from a given index
export function getDayByIndex(index) {
  return moment(FIRST_DAY).add(index, "days").toDate();
}

// Return true if index is after 0 and before today's index
export function isValidIndex(index) {
  return index >= 0 && index < getDay();
}

// Return true if date is after FIRST_DAY and before today
export function isValidDate(date) {
  return isValidIndex(getDayDiff(date));
}

// Return the first incomplete day for the archive
export function getLatestIncompleteIndex(listName) {
  let idx = 0;
  let archivedCompleted = getListData(listName, false);

  if (archivedCompleted && archivedCompleted.completed) {
    let found = false;
    while (!found && idx < getDay()) {
      if (archivedCompleted.completed.includes(idx)) {
        idx++;
      } else {
        found = true;
      }
    }
  }
  return idx;
}

// Return the list based on the listname given
export function getWordList(listName) {
  if (listName.includes("sevens")) {
    return seven_hints;
  } else if (listName.includes("eights")) {
    return eights_hints;
  } else if (listName.includes("nines")) {
    return nine_hints;
  }
  // TODO: add more lists
  return [];
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
    hints: listData.hints,
  };
}

// Get a new word from the list
// Returns - JSON object containing word and index in list
export function getWord(listName, useArchive) {
  let list = getWordList(listName);
  let idx = useArchive ? getLatestIncompleteIndex() : getDay();

  // Eights handling since they are more complex
  if (listName.includes("eights")) {
    return {
      index: idx,
      word: list[idx].WORD,
      alpha: list[idx].ALPHA,
      letter: list[idx].LETTER,
      letterIndex: list[idx].INDEX,
      hints: list[idx].HINTS,
    };
  }

  // Return object with index + word so that it can be marked complete
  return {
    index: idx,
    word: list[idx].WORD,
    alpha: list[idx].ALPHA,
    hints: list[idx].HINTS,
  };
}

// For archived retrieval of past words
export function getWordByIndex(listName, index) {
  // Cannot request words past the the previous day or earlier than the first day
  if (!isValidIndex(index)) {
    return;
  }
  let list = getWordList(listName);

  // Eights handling since they are more complex
  if (listName.includes("eights")) {
    return {
      index: index,
      word: list[index].WORD,
      alpha: list[index].ALPHA,
      letter: list[index].LETTER,
      letterIndex: list[index].INDEX,
      hints: list[index].HINTS,
    };
  }
  return {
    index: index,
    word: list[index].WORD,
    alpha: list[index].ALPHA,
    hints: list[index].HINTS,
  };
}

export function isWordCompleted(listName, index) {
  const data = getListData(listName, false).completed;
  return data.includes(index);
}

export function getDisplayedHintsForWord(listName, index) {
  const data = getListData(listName, false).hints;
  if (data && data[index]) {
    return data[index];
  }

  return [];
}

// Save index and number of attempts of completed anagram to given list
// Returns - nothing
export function markWordCompleted(listName, index, displayedHints) {
  const listData = getListData(listName, false);

  let newListData = {
    completed: [...listData.completed, index],
    hints: { ...listData.hints },
  };
  newListData.hints[index] = displayedHints;

  let newData = {
    ...getSavedData(),
  };
  newData[listName] = newListData;
  saveData(newData);
}

// Reset ALL saved anagram data
export function resetAllData() {
  saveData({});
  window.location.reload();
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
  window.location.reload();
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
