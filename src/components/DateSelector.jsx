import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import "react-datepicker/dist/react-datepicker.css";
import {
  FIRST_DAY,
  getDay,
  getDayByIndex,
  isValidIndex,
} from "../utils/wordUtils";

// TODO: Change buttons to Button component w/o losing style changes
function DateSelector({ dateIndex, setDate }) {
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div role='button' onClick={onClick} ref={ref}>
      {value}
    </div>
  ));
  const date = getDayByIndex(dateIndex);
  
  return (
    <Container
      className='btn-group my-2'
      role='group'
      aria-label='Date Selector'
      style={{ width: "auto" }}
    >
      <button
        type='button'
        tabIndex='-1'
        className='date-btn btn btn-outline-primary  d-flex justify-content-center align-items-center'
        onClick={() => setDate(getDayByIndex(dateIndex - 1))}
        disabled={!isValidIndex(dateIndex - 1)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='currentColor'
          className='bi bi-arrow-left'
          viewBox='0 0 16 16'
        >
          <path
            fillRule='evenodd'
            d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z'
          />
        </svg>{" "}
      </button>
      <div className='date-btn btn btn-outline-primary p-0'>
        <DatePicker
          selected={date}
          onChange={(newDate) => setDate(newDate)}
          minDate={FIRST_DAY.toDate()}
          maxDate={getDayByIndex(getDay() - 1)}
          dateFormat='MM/dd/yyyy'
          customInput={<ExampleCustomInput />}
          showWeekNumbers
        />
      </div>

      <button
        type='button'
        tabIndex='-1'
        className='date-btn btn btn-outline-primary  d-flex justify-content-center align-items-center'
        onClick={() => setDate(getDayByIndex(dateIndex + 1))}
        disabled={!isValidIndex(dateIndex + 1)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='currentColor'
          className='bi bi-chevron-double-right'
          viewBox='0 0 16 16'
        >
          <path
            fillRule='evenodd'
            d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z'
          />
        </svg>{" "}
      </button>
    </Container>
  );
}

export default DateSelector;
