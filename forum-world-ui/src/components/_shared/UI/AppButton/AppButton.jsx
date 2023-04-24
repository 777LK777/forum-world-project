import React from 'react';
import classes from './AppButton.module.scss';

const AppButton = ({children, onClick}) => {
 
  return (
    <button 
      className={classes.button}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default AppButton;