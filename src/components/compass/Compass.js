import React from 'react';

import './compass.css';
import Button1 from '../../sub-components/button1/Button1';
import Title1 from '../../sub-components/title1/Title1';

const Compass = (props) => {
  const {direction}=props;
  return (
    <div className="compass-wrapper">
      <Title1>Control Panel</Title1>
      <Button1 onClick={props.onEngage}>Engage</Button1>
      <div className="compass">
        <div className="hor">
          <Button1 classes="btn-primary btn-circle btn1" onClick={() => direction('W')}>W</Button1>
          <Button1 classes="btn-primary btn-circle btn2" onClick={() => direction('E')}>E</Button1>
        </div>
        <div className="ver">
          <Button1 classes="btn-primary btn-circle btn1" onClick={() => direction('N')}>N</Button1>
          <Button1 classes="btn-primary btn-circle btn2" onClick={() => direction('S')}>S</Button1>
        </div>
      </div>
    </div>
  )
}

export default Compass;