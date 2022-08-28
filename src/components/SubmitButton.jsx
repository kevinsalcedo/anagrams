import {
  isValidIndex,
  getDayByIndex,
  isTodaysPairComplete,
} from "../utils/wordUtils";

function SubmitButton({
  isArchive,
  solved,
  skipped,
  dateIndex,
  handleDateChange,
  handleSubmit,
  switchGame,
  game,
}) {
  function handleClick() {
    if (solved || skipped) {
      if (isArchive) {
        handleDateChange(getDayByIndex(dateIndex + 1));
      } else {
        if (!isTodaysPairComplete(game)) {
          switchGame(game === "sevens" ? "eights" : "sevens");
        }
      }
    } else {
      handleSubmit();
    }
  }
  // TODO: FIX THAT TERNARY LMAO
  return (
    <button
      className={`ms-1 submit-button btn ${
        solved ? "bg-success bg-opacity-75" : "btn-secondary"
      }
      ${skipped ? "bg-danger" : ""} text-white`}
      onClick={() => handleClick()}
      style={{ width: "5rem" }}
      disabled={
        ((solved || skipped) && !isArchive && isTodaysPairComplete(game)) ||
        !isValidIndex(dateIndex + 1)
      }
      tabIndex='-1'
    >
      {solved
        ? isArchive
          ? "Next"
          : game === "sevens"
          ? "Eights"
          : "Sevens"
        : "Submit"}
    </button>
  );
}

export default SubmitButton;
