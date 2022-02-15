import { useState } from "react";

function MainNav({ setGame }) {
  const [collapsed, setCollapsed] = useState(true);

  function toggleGame(game) {
    setGame(game);
    setCollapsed((prev) => true);
  }
  return (
    <nav className='nav-fixed-top w-100 navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <button
          className={`navbar-toggler ${collapsed ? "collapsed" : ""}`}
          type='button'
          data-bs-toggle='offcanvas'
          data-bs-target='#offcanvasNavbar'
          aria-controls='offcanvasNavbar'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='offcanvas offcanvas-start'
          tabIndex='-1'
          id='offcanvasNavbar'
        >
          <div className='offcanvas-header'>
            <h5 className='offcanvas-title' id='offcanvasNavbarLabel'>
              Anagram of the Day
            </h5>
            <button
              type='button'
              className='btn-close text-reset'
              data-bs-dismiss='offcanvas'
              aria-label='Close'
            ></button>
          </div>
          <div className='offcanvas-body'>
            <ul className='navbar-nav justify-content-start flex-grow-1 pe-3'>
              <li className='nav-item '>
                <button
                  className='btn nav-link'
                  onClick={() => toggleGame("sevens")}
                >
                  Sevens
                </button>
              </li>
              <li className='nav-item'>
                <button
                  className='btn nav-link'
                  data-bs-target='#navbarSupportedContent'
                  aria-controls='navbarSupportedContent'
                  onClick={() => toggleGame("eights")}
                >
                  Eights
                </button>
              </li>
              <li className='nav-item'>
                <button
                  className='btn nav-link'
                  data-bs-target='#navbarSupportedContent'
                  aria-controls='navbarSupportedContent'
                  onClick={() => toggleGame("archived-sevens")}
                >
                  Archive
                </button>
              </li>
            </ul>
          </div>
        </div>
        <button
          type='button'
          className='btn btn-secondary d-flex justify-content-center'
          data-bs-toggle='modal'
          data-bs-target='#settingsModal'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-gear-fill mx-auto my-auto'
            viewBox='0 0 16 16'
          >
            <path d='M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z' />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default MainNav;
