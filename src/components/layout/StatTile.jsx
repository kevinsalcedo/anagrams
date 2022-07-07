function StatTile({ items, padHeight = false }) {
  const tile = (title, value) => {
    return (
      <div
        className='d-flex flex-column col m-1 justify-content-center'
        style={{ backgroundColor: "lightgray" }}
      >
        {title && <div>{title}</div>}
        {value && <div>{value}</div>}
      </div>
    );
  };

  const styles = {};
  if (padHeight) {
    styles.height = "5rem";
  }

  return (
    <div className='d-flex row w-100' style={styles}>
      {items.length && items.map(({ title, value }) => tile(title, value))}
    </div>
  );
}

export default StatTile;
