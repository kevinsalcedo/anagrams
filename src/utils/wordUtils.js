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
      hints: {},
      skipped: [],
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
    skipped: listData.skipped,
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
  return data && data.includes(index);
}

export function isWordSkipped(listName, index) {
  const data = getListData(listName, false).skipped;
  return data && data.includes(index);
}

export function saveHintsForWord(listName, index, hints) {
  let listData = getListData(listName, false);

  let newListData = { ...listData };

  if (!newListData.hints) {
    newListData.hints = {};
  }
  newListData.hints[index] = hints;
  let newData = { ...getSavedData() };
  newData[listName] = newListData;
  saveData(newData);
}

export function getDisplayedHintsForWord(listName, index) {
  const data = getListData(listName, false).hints;
  if (data && data[index]) {
    return data[index];
  }

  return [];
}

export function markWordSkipped(listName, index) {
  const listData = getListData(listName, false);
  let newListData = {
    ...listData,
    skipped: [...listData.skipped, index],
  };

  let newData = {
    ...getSavedData(),
  };
  newData[listName] = newListData;
  saveData(newData);
}

// Save index and number of attempts of completed anagram to given list
// Returns - nothing
export function markWordCompleted(listName, index, displayedHints) {
  const listData = getListData(listName, false);

  let newListData = {
    ...listData,
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

export function getStats(listName) {
  if (listName === "all") {
    let sevens = getPlayerStatistics("sevens");
    let eights = getPlayerStatistics("eights");

    let aggregated = {
      numCompleted: sevens.numCompleted + eights.numCompleted,
      numSkipped: sevens.numSkipped + eights.numSkipped,
      totalHints: sevens.totalHints + eights.totalHints,
      avgHints: (
        (sevens.totalHints + eights.totalHints) /
        (sevens.numCompleted + eights.numCompleted)
      ).toFixed(2),
      numWords: sevens.numWords + eights.numWords,
    };
    console.log(aggregated);
    return aggregated;
  }

  return getPlayerStatistics(listName);
}

export function getPlayerStatistics(listName) {
  let stats = {
    numCompleted: 0,
    numSkipped: 0,
    totalHints: 0,
    avgHints: 0,
    numWords: 0,
    currentStreak: 0,
    bestStreak: 0,
  };

  let data = getListData(listName);
  let words = getWordList(listName);

  stats.numWords = words.length;
  stats.numCompleted = data.completed ? data.completed.length : 0;
  stats.numSkipped = data.skipped ? data.skipped.length : 0;
  stats.totalHints = getAllHintStats(false);
  stats.avgHints = getAllHintStats(true);
  stats.currentStreak = getCurrentStreak();
  stats.bestStreak = getBestStreak();

  return stats;
}

function getAllHintStats(returnAvg) {
  let sevens = getListData("sevens");
  let eights = getListData("eights");

  let sevenHint = getHintStats(sevens.hints, false);
  let eightHint = getHintStats(eights.hints, false);

  if (returnAvg) {
    return (
      (sevenHint + eightHint) /
      (Object.keys(sevenHint).length + Object.keys(eightHint).length)
    );
  }
  return sevenHint + eightHint;
}

function getHintStats(hints, returnAvg) {
  let count = 0;
  let numKeys = 0;
  if (!hints || hints.length === 0) {
    return;
  }

  let keys = Object.keys(hints);
  for (let i = 0; i < keys.length; i++) {
    let hintsUsed = hints[keys[i]];
    if (hintsUsed && hintsUsed.length > 0) {
      count += hintsUsed.length;
      numKeys++;
    }
  }
  if (returnAvg) {
    return numKeys > 0 ? (count / numKeys).toFixed(2) : 0;
  }

  return count;
}

export function getCurrentStreak() {
  let sevensData = getListData("sevens", false);
  let eightsData = getListData("eights", false);

  if (
    sevensData &&
    sevensData.completed &&
    eightsData &&
    eightsData.completed
  ) {
    let streak = 0;
    let day = getDay();
    let sevensComp = sevensData.completed;
    let eightsComp = eightsData.completed;
    while (sevensComp.includes(day) && eightsComp.includes(day)) {
      streak++;
      day--;
    }
    return streak;
  }

  return 0;
}

export function getBestStreak() {
  let sevensData = getListData("sevens", false);
  let eightData = getListData("eights", false);
  if (sevensData && sevensData.completed) {
    let streak = 0;
    let best = 0;
    let day = getDay();
    let sevensComp = sevensData.completed;
    let eightsComp = eightData.completed;
    while (day >= 0) {
      if (sevensComp.includes(day) && eightsComp.includes(day)) {
        streak++;
      } else {
        best = Math.max(best, streak);
        streak = 0;
      }
      day--;
    }
    return best;
  }
  return 0;
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
    hints: {},
    skipped: [],
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
