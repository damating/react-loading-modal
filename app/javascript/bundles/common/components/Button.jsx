import React from 'react';
import PropTypes from 'prop-types';

var buttonStyle = {
  margin: '0 5px 0 0'
};

const Button = ({label, buttonClass, disabled, onClick}) => {
  return (
    <button
      className={buttonClass}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}>{label}
    </button>
  )
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  buttonClass: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default Button;
