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

export function showAlert(type, message) {
  const alertDiv = document.getElementById("liveAlert");
  alertDiv.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.innerHTML =
    '<div id="the-alert" class="alert alert-' +
    type +
    ' alert-dismissible fade show vw-100" role="alert" style="position: absolute">' +
    message +
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
  alertDiv.append(wrapper);
}
