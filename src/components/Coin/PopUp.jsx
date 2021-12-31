import React from 'react';

function PopUp(props) {

  return props.trigger ? (
    <div className='popup'>
      <div className='popup-inner' >
      <button type="button" className="btn-close" data-bs-dismiss="alert" 
      onClick={() => {props.setTrigger(false)}}>
      </button>
        {props.children}
      </div>
    </div>
  ) : "";
}

export default PopUp
