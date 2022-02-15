import moment from "moment";
import { FIRST_DAY } from "../../utils/wordUtils";

function PageTitle({ title, subtitle, date }) {
  const day = moment(FIRST_DAY).add(date, "days");
  if (subtitle.includes("archived")) {
    subtitle = subtitle.split("-")[1];
  }
  return (
    <div
      id='titleRow'
      className='row align-items-start justify-content-start mt-auto mb-3'
    >
      <h1 className='page-title display-1 '>{title.toUpperCase()}</h1>
      <h2 className='page-title'>{subtitle.toUpperCase()}</h2>
      {date !== null && <h3 className='mt-3'>{day.format("MMMM D, YYYY")}</h3>}
    </div>
  );
}

export default PageTitle;
