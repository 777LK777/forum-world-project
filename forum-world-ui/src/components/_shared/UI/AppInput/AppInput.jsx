import React from 'react';
import styles from './AppInput.module.scss';

const AppInput = ({ type = 'text', placeholder, value, onChange, onBlur = () => {} }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={styles.input}
      onBlur={onBlur}
    />
  );
};

export default AppInput;
