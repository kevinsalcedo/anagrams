import { shuffled_sevens } from "../assets/shuffled_sevens";
import { random_eights } from "../assets/random_eights";
import moment from "moment";

// TODO: Set to be the launch day
export const FIRST_DAY = moment([2022, 0, 15]);

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

export function getWordList(listName) {
  if (listName.includes("sevens")) {
    return shuffled_sevens;
  } else if (listName.includes("eights")) {
    return random_eights;
  }
  // TODO: add more lists
  return shuffled_sevens;
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
  let idx = useArchive ? getLatestIncompleteIndex() : getDay();

  // Eights handling since they are more complex
  if (listName.includes("eights")) {
    const listKeys = Object.keys(list);
    // In case somehow the eights list is not long enough
    if (idx > listKeys.length) {
      idx = idx % listKeys.length;
    }
    // Get array of possible puzzle options for the given word
    const wordOptions = list[listKeys[idx]];
    // Generate an index based on the word's unicode composition
    let random = getRandomizedIndex(listKeys[idx], wordOptions.length);
    let wordObj = { ...wordOptions[random] };

    if (wordObj.INDEX < 0) {
      random = getRandomizedIndex(listKeys[idx], 8, true);
      wordObj.INDEX = random;
      wordObj.LETTER = listKeys[idx].charAt(random);
      wordObj.ALPHA = wordObj.ALPHA.replace(wordObj.LETTER, "");
    }

    return {
      index: idx,
      word: listKeys[idx],
      alpha: wordObj.ALPHA.replace(wordObj.LETTER, ""),
      letter: wordObj.LETTER,
      letterIndex: wordObj.INDEX,
    };
  }

  // Return object with index + word so that it can be marked complete
  return {
    index: idx,
    word: list[idx],
  };
}

// Add up unicode values of given word and divide it by its length
function getRandomizedIndex(word, maxLength, excludeEnds = false) {
  let count = 0;

  for (let i = 0; i < word.length; i++) {
    count += word.charCodeAt(i);
  }

  // We don't want to get the first or last indexes (i.e. 0 or 7 for eights)
  // For picking the index of an 8 letter word
  if (excludeEnds) {
    return (count % (maxLength - 2)) + 1;
  }
  return count % maxLength;
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
    const listKeys = Object.keys(list);
    // In case somehow the eights list is not long enough
    if (index > listKeys.length) {
      index = index % listKeys.length;
    }
    // Get array of possible puzzle options for the given word
    const wordOptions = list[listKeys[index]];
    // Generate an index based on the word's unicode composition
    let random = getRandomizedIndex(listKeys[index], wordOptions.length);
    let wordObj = { ...wordOptions[random] };

    if (wordObj.INDEX < 0) {
      random = getRandomizedIndex(listKeys[index], 8, true);
      wordObj.INDEX = random;
      wordObj.LETTER = listKeys[index].charAt(random);
      wordObj.ALPHA = wordObj.ALPHA.replace(wordObj.LETTER, "");
    }

    return {
      index: index,
      word: listKeys[index],
      alpha: wordObj.ALPHA,
      letter: wordObj.LETTER,
      letterIndex: wordObj.INDEX,
    };
  }
  return {
    index: index,
    word: list[index],
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
