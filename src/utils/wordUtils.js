import { seven_hints } from "../assets/seven_hints";
import { eights_hints } from "../assets/eight_hints";
import { nine_hints } from "../assets/nine_hints";
import moment from "moment";

// TODO: Set to be the launch day
export const FIRST_DAY = moment([2022, 0, 1]);

// Returns - the current day's index (current day - launch day)
export function getDay() {
  let today = moment();
  return today.diff(FIRST_DAY, "days");
}

// Returns - the day index of the given date
export function getDayDiff(date) {
  return moment(date).diff(FIRST_DAY, "days");
}

// Returns - the date from a given index (launch day + index # of days)
export function getDayByIndex(index) {
  return moment(FIRST_DAY).add(index, "days").toDate();
}

// Returns - true if index is after 0 and before today's index
export function isValidIndex(index) {
  return index >= 0 && index < getDay();
}

// Returns - true if date is after FIRST_DAY and before today
export function isValidDate(date) {
  return isValidIndex(getDayDiff(date));
}

// Returns - the first incomplete day for the archive
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

// Returns - the entire word list based on the listname given
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

// Save the given game data
// Returns - nothing
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

// Get list data object for app
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
// Returns - word info for a given index
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

// Returns - true if word of the day has been completed for hte given list
export function isWordCompleted(listName, index) {
  const data = getListData(listName, false).completed;
  return data && data.includes(index);
}

// Returns - true if word of the day has been skipped for hte given list
export function isWordSkipped(listName, index) {
  const data = getListData(listName, false).skipped;
  return data && data.includes(index);
}

// Method to save hints whenever a user reveals one
// Prevents users resetting hints when refreshing or leaving page
// Returns - nothing
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

// Returns -  the saved hints from localstorage
export function getDisplayedHintsForWord(listName, index) {
  const data = getListData(listName, false).hints;
  if (data && data[index]) {
    return data[index];
  }

  return [];
}

// Save skipped words so that they stay skipped when leaving page
// Returns - nothing
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

// Get game statistics for information modal
// Returns - JSON object with game stats
// TODO - add parameter to retrieve archive stats instaed
export function getStats() {
  let stats = {
    numCompleted: 0,
    numSkipped: 0,
    totalHints: 0,
    avgHints: 0,
    currentStreak: 0,
    bestStreak: 0,
  };

  stats.numCompleted = getCompletedPairs();
  stats.numSkipped = getNumSkipped();
  stats.totalHints = getAllHintStats(false);
  stats.avgHints = getAllHintStats(true);
  stats.currentStreak = getCurrentStreak();
  stats.bestStreak = getBestStreak();

  return stats;
}

// Statistics Helper
// Returns - count of indices present in both lists (num days where user did both 7s and 8s)
function getCompletedPairs() {
  let sevens = getListData("sevens");
  let eights = getListData("eights");

  let completedSevens = sevens.completed ? sevens.completed : [];
  let completedEights = eights.completed ? eights.completed : [];

  let intersection = completedSevens.filter((value) =>
    completedEights.includes(value)
  );

  return intersection.length;
}

// Statistics Helper
// Returns - total number of individual words skipped
function getNumSkipped() {
  let sevens = getListData("sevens");
  let eights = getListData("eights");

  let skippedSevens = sevens.skipped ? sevens.skipped.length : 0;
  let skippedEights = eights.skipped ? eights.skipped.length : 0;

  return skippedSevens + skippedEights;
}

// Statistics Helper
// Returns - if returnAvg = false, total number of hints used
// Returns - if returnAvg = true, total number of hints used divided by the total words played
// TODO - confirm this ONLY includes days user has played (unfinished, skipped, completed)
function getAllHintStats(returnAvg) {
  let sevens = getListData("sevens");
  let eights = getListData("eights");

  let sevenHint = getHintStats(sevens.hints, false);
  let eightHint = getHintStats(eights.hints, false);

  if (returnAvg && sevenHint + eightHint > 0) {
    const avg =
      (sevenHint + eightHint) /
      (Object.keys(sevens.hints).length + Object.keys(eights.hints).length);
    return avg.toPrecision(2);
  }
  return sevenHint + eightHint;
}

// Statistics Helper, Helper
// Returns - Hint information given a list name
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

// Statistics Helper
// Returns - The number of consecutive days a user has completed
// TODO - if a user has a streak but hasn't completed the day, still display the streak
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

// Statistics Helper
// Returns user's best consecutive streak
// TODO - make sure same as above
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

// Reset ALL saved anagram data and refresh page
// Returns - nothing
// TODO - make sure that this isn't available in production
export function resetAllData() {
  saveData({});
  window.location.reload();
}

// Reset saved anagram data for a given list
// Returns - nothing
// TODO - change so that it only resets skipped words in archive
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
    hints: {0: [], 1: [], ...},
    skipped : [3,4,...]
  },
  listName2: {
    completed: [5,7,...],
    hints: {0: [], 1: [], ...},
    skipped : [3,4,...]
  }
}
*/
