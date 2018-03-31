import React from 'react';
import PropTypes from 'prop-types';

const LoadingModal = ({isOpen, percentageProgress}) => {
  if(!isOpen) {
    return null;
  }

  return (
    <div role="dialog" className="modal-dialog">
      <div className="modal-content">
        <div className="modal-body">
          <div className="progress">
            <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow={percentageProgress}
                 aria-valuemin="0" aria-valuemax="100" style={{width: percentageProgress + "%"}}>
              <p className="no-margin">{percentageProgress}% Complete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

LoadingModal.propTypes = {
  percentageProgress: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default LoadingModal;
