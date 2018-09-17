import React from 'react';
import './button1.css';

const Button1=(props)=>{
  const {type='button',children,onClick}=props;
  let {classes=' btn-primary'}=props;

  return <button type={type} className={'btn '+classes} onClick={onClick}>{children}</button>;
}

export default Button1;