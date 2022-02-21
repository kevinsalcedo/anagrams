import { isValidIndex, getDayByIndex } from "../utils/wordUtils";

function SubmitButton({
  isArchive,
  solved,
  skipped,
  dateIndex,
  handleDateChange,
  handleSubmit,
}) {
  function handleClick() {
    if (solved || skipped) {
      handleDateChange(getDayByIndex(dateIndex + 1));
    } else {
      handleSubmit();
    }
  }
  return (
    <button
      className={`ms-1 submit-button btn ${
        solved ? "bg-success bg-opacity-75" : "btn-secondary"
      }
      ${skipped ? "bg-danger" : ""} text-white`}
      onClick={() => handleClick()}
      style={{ width: "5rem" }}
      disabled={
        ((solved || skipped) && !isArchive) || !isValidIndex(dateIndex + 1)
      }
      tabIndex='-1'
    >
      {isArchive && solved ? "Next" : "Submit"}
    </button>
  );
}

export default SubmitButton;
