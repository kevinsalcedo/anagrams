function ConfirmModal({
  title = "Confirm",
  message = "Are you sure you want to do this?",
  confirmAction,
}) {
  return (
    <div
      className='modal fade'
      id='confirmModal'
      tabIndex='-1'
      aria-labelledby='confirmModal'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='confirmModalLabel'>
              {title}
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <div className='container d-flex mx-auto flex-column'>
              {message}
            </div>
          </div>

          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
            >
              Close
            </button>
            <button
              className='btn btn-primary'
              data-bs-dismiss='modal'
              onClick={confirmAction}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
