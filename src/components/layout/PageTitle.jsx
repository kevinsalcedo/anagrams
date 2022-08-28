import Row from 'react-bootstrap/Row';
function PageTitle({ title, subtitle }) {
  if (subtitle.includes("archived")) {
    subtitle = subtitle.split("-")[1];
  }
  return (
    <Row
      id='titleRow'
      className='align-items-start justify-content-center my-auto'
    >
      <h1 className='page-title display-1 '>{title.toUpperCase()}</h1>
      <h2 className='page-title'>{subtitle.toUpperCase()}</h2>
    </Row>
  );
}

export default PageTitle;
