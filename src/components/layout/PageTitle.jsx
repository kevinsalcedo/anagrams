function PageTitle({ title }) {
  return (
    <div id="titleRow" className="row align-items-center mt-3 mb-3">
      <h1 className="page-title display-1 ">{title.toUpperCase()}</h1>
    </div>
  );
}

export default PageTitle;
