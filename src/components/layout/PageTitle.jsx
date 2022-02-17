function PageTitle({ title, subtitle }) {
  if (subtitle.includes("archived")) {
    subtitle = subtitle.split("-")[1];
  }
  return (
    <div
      id='titleRow'
      className='row align-items-start justify-content-center my-auto'
    >
      <h1 className='page-title display-1 '>{title.toUpperCase()}</h1>
      <h2 className='page-title'>{subtitle.toUpperCase()}</h2>
    </div>
  );
}

export default PageTitle;
