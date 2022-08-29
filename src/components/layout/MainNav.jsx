import { useState } from "react";

function MainNav({ setGame, setModalShow }) {
  const [collapsed, setCollapsed] = useState(true);

  function toggleGame(game) {
    setGame(game);
    setCollapsed((prev) => true);
  }
  return (
    <nav className='w-100 navbar navbar-expand-lg navbar-light bg-light'>
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
          z-index='10000'
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
            <ul className='navbar-nav justify-content-start pe-3'>
              <li className='nav-item '>
                <button
                  tabIndex='-1'
                  className='btn nav-link'
                  data-bs-dismiss='offcanvas'
                  onClick={() => toggleGame("sevens")}
                >
                  Sevens
                </button>
              </li>
              <li className='nav-item'>
                <button
                  tabIndex='-1'
                  className='btn nav-link'
                  data-bs-dismiss='offcanvas'
                  onClick={() => toggleGame("eights")}
                >
                  Eights
                </button>
              </li>
              <li className='nav-item'>
                <button
                  tabIndex='-1'
                  className='btn nav-link'
                  data-bs-dismiss='offcanvas'
                  onClick={() => toggleGame("nines")}
                >
                  Nines
                </button>
              </li>
              <li className='nav-item dropdown'>
                <button
                  tabIndex='-1'
                  className='btn nav-link dropdown-toggle'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  Archives
                </button>
                <ul className='dropdown-menu'>
                  <li>
                    <button
                      tabIndex='-1'
                      className='dropdown-item btn nav-link'
                      data-bs-dismiss='offcanvas'
                      onClick={() => toggleGame("archived-sevens")}
                    >
                      Sevens
                    </button>
                  </li>
                  <li>
                    <button
                      tabIndex='-1'
                      className='dropdown-item btn nav-link'
                      data-bs-dismiss='offcanvas'
                      onClick={() => toggleGame("archived-eights")}
                    >
                      Eights
                    </button>
                  </li>
                  {/* <li>
                    <button
                      tabIndex='-1'
                      className='dropdown-item btn nav-link'
                      data-bs-dismiss='offcanvas'
                      onClick={() => toggleGame("archived-nines")}
                    >
                      Nines
                    </button>
                  </li> */}
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className='d-flex navbar-nav flex-row '>
          <div className='nav-item me-2'>
            <a
              className='nav-link'
              target='_blank'
              rel='noreferrer'
              href='https://forms.gle/WgeFWJziGFn86cJy5'
            >
              Feedback!
            </a>
          </div>
          <button
            type='buton'
            tabIndex='-1'
            className='btn btn-secondary d-flex justify-content-center align-items-center me-2'
            onClick={() => setModalShow(true)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-bar-chart-fill'
              viewBox='0 0 16 16'
            >
              <path d='M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z' />
            </svg>
          </button>
          <button
            type='button'
            tabIndex='-1'
            className='btn btn-secondary d-flex justify-content-center align-items-center'
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
      </div>
    </nav>
  );
}

export default MainNav;
