import { common_sevens } from "./assets/common_sevens.js";

// Load the seven-letter anagram list into localStorage if not present
export const getSevensList = () => {
  return common_sevens;
};

export function getSevenOfTheDay() {
  // Populate list of 7-letter anagrams
  const list = getSevensList();

  // Get existing list of 7-letter anagrams
  if (!list) {
    return;
  }
  // Get existing list of completed 7-letter anagrams
  const completedList = JSON.parse(localStorage.getItem("completedSevens"));

  // Find an index that doesn't exist within the completed answers list
  let idx = Math.floor(Math.random() * list.length + 1);
  if (completedList) {
    while (completedList.includes(idx)) {
      idx = Math.floor(Math.random() * list.length + 1);
    }
  }

  // Return object with index + word so that it can be marked complete
  return {
    index: idx,
    word: list[idx],
  };
}

export function markCompleted(listName, answerIndex) {
  const completedName = listName + "-completed";
  let list = localStorage.getItem(completedName);
  if (!list) {
    list = [];
  } else {
    list = JSON.parse(localStorage.getItem(completedName));
  }
  localStorage.setItem(completedName, JSON.stringify([...list, answerIndex]));
}
