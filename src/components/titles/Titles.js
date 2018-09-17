import React from 'react';
import './titles.css';
import emoticon from '../../imgs/emoticon.png';

const Titles=(props)=>{
  return (
    <div>
      <h4 className="main-title">Use the control buttons or arrow keys and space bar, or...</h4>
      <h5 className="main-title2">use the teleporter! <img src={emoticon} alt="" /></h5>
    </div>
  )
}

export default Titles;