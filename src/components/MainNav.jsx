import { Link } from "react-router-dom";

function MainNav() {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                Sevens
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/eights'>
                Eights
              </Link>
            </li>
          </ul>
        </div>
        <div className='d-flex'>
          <button
            className='btn btn-secondary'
            data-bs-toggle='modal'
            data-bs-target='#infoModal'
          >
            Info
          </button>
        </div>
      </div>
    </nav>
  );
}

export default MainNav;
