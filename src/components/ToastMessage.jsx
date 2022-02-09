import { useEffect, useRef } from "react";
import { Toast } from "bootstrap";

function ToastMessage({ visible, setVisible, msg, type }) {
  const toastRef = useRef();

  useEffect(() => {
    var myToast = toastRef.current;
    var bsToast = Toast.getInstance(myToast);
    if (!bsToast) {
      bsToast = new Toast(myToast);
      bsToast.hide();
      setVisible(false);
    } else {
      visible ? bsToast.show() : bsToast.hide();
    }
  });

  return (
    <div className='row justify-content-center'>
      <div className='position-fixed mt=5 d-flex justify-content-center py-2'>
        <div
          className={`toast align-items-center text-white bg-${type} border-0`}
          role='alert'
          ref={toastRef}
        >
          <div className='d-flex'>
            <div className='toast-body'>{msg}</div>
            <button
              type='button'
              className='btn-close btn-close-white btn me-2 m-auto'
              onClick={() => setVisible(false)}
              aria-label='Close'
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ToastMessage;
