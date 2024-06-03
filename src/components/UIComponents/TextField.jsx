import React from 'react';
import '../../styles/TextField.css';

const TextField = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="text-field"
    />
  );
};

export default TextField;
