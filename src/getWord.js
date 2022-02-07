import wordFiles from "./assets/common_sevens.txt";

// Load the seven-letter anagram list into localStorage if not present
const getSevensList = () => {
  if (!localStorage.getItem("sevensList")) {
    fetch(wordFiles)
      .then((r) => r.text())
      .then((text) => {
        try {
          const list = JSON.stringify(text.split("\n"));
          localStorage.setItem("sevensList", list);
        } catch (err) {
          console.log("Error while loading list.");
        }
      });
  }
};

export function getSevenOfTheDay() {
  // Populate list of 7-letter anagrams
  getSevensList();

  // Get existing list of 7-letter anagrams
  const list = JSON.parse(localStorage.getItem("sevensList"));
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
