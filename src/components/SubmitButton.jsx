import { isValidIndex, getDayByIndex } from "../utils/wordUtils";

function SubmitButton({
  isArchive,
  solved,
  dateIndex,
  handleDateChange,
  handleSubmit,
}) {
  function handleClick() {
    if (solved) {
      handleDateChange(getDayByIndex(dateIndex + 1));
    } else {
      handleSubmit();
    }
  }
  return (
    <div className='container mx'>
      <div className='btn btn-secondary opacity-75 me-1'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='#198754'
          className='bi bi-circle-fill me-1'
          viewBox='0 0 16 16'
        >
          <circle cx='8' cy='8' r='8' />
        </svg>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='#198754'
          className='bi bi-circle-fill'
          viewBox='0 0 16 16'
        >
          <circle cx='8' cy='8' r='8' />
        </svg>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='white'
          className='bi bi-circle-fill ms-1'
          viewBox='0 0 16 16'
        >
          <circle cx='8' cy='8' r='8' />
        </svg>
      </div>
      <button
        className={`ms-1 submit-button btn ${
          solved ? "bg-success bg-opacity-75" : "btn-secondary"
        } text-white`}
        onClick={() => handleClick()}
        style={{ width: "5rem" }}
        disabled={(solved && !isArchive) || !isValidIndex(dateIndex + 1)}
        tabIndex='-1'
      >
        {isArchive && solved ? "Next" : "Submit"}
      </button>
    </div>
  );
}

export default SubmitButton;
