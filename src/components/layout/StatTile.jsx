import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function StatTile({ items, padHeight = false }) {
  const tile = (title, value) => {
    return (
      <Col
      key={title + "_tile"}
        className='d-flex flex-column m-1 justify-content-center align-items-center'
        style={{ backgroundColor: "lightgray" }}
      >
        {title && <div>{title}</div>}
        {value && <div>{value}</div>}
      </Col>
    );
  };

  const styles = {};
  if (padHeight) {
    styles.height = "5rem";
  }

  return (
    <Row className='d-flex row w-100' style={styles}>
      {items.length && items.map(({ title, value }) => tile(title, value))}
    </Row>
  );
}

export default StatTile;
