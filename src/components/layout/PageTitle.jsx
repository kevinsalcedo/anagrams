import moment from "moment";
import { FIRST_DAY } from "../../utils/wordUtils";

function PageTitle({ title, date }) {
  const day = moment(FIRST_DAY).add(date, "days");
  return (
    <div
      id='titleRow'
      className='row align-items-start justify-content-start mt-auto mb-auto'
    >
      <h1 className='page-title display-1 '>{title.toUpperCase()}</h1>
      {date !== null && <h3 className='mt-3'>{day.format("MMMM D, YYYY")}</h3>}
    </div>
  );
}

export default PageTitle;
