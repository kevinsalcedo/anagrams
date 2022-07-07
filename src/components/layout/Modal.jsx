function Modal({ modalID, titleText, footerText, footerAction, children }) {
  return (
    <div
      className='modal fade'
      id={`${modalID}-modal`}
      tabIndex='-1'
      aria-labelledby={`${modalID}-modal`}
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id={`${modalID}-title`}>
              {titleText}
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <div className='container d-flex mx-auto flex-column w-50'>
              {children}
            </div>
          </div>

          <div className='modal-footer'>
            {footerText && (
              <button
                type='button'
                className='btn btn-primary'
                onClick={footerAction}
              >
                {footerText}
              </button>
            )}
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
