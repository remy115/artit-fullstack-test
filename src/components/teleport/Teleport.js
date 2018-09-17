import React from 'react';

import './teleport.css';
import Button1 from '../../sub-components/button1/Button1';
import Title1 from '../../sub-components/title1/Title1';

class Teleport extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      coordX:0,
      coordY:0
    }

    this.onChange=this.onChange.bind(this);
  }

  onChange(evt) {
    const {name}=evt.target;
    let {value}=evt.target;
    if(value) {
      if(value.match(/[\D]/g)) {
        return false;
      }
      value=parseInt(value,10);
      if(value > 20) value=20;
      if(value < 0) value=0;
      
    } else {
      value=0;
    }

    this.setState({
      [name]:value
    });
  }

  render() {

    const {squares}=this.props;
    const maxX=squares.hor;
    const maxY=squares.ver;

    return (
      <div className="teleport-div">
        <Title1>Teleporter</Title1>
        <div className="fields">
          <div className="form-group">
            <label htmlFor="coordX">X <small>(min:0 max:{maxX})</small></label>
            <input type="text" name="coordX" id="coordX" min="0" max={maxX} onChange={this.onChange} value={this.state.coordX} />
          </div>
          <div className="form-group">
            <label htmlFor="coordY">Y <small>(min:0 max:{maxY})</small></label>
            <input type="text" name="coordY" id="coordY" min="0" max={maxY} onChange={this.onChange} value={this.state.coordY} />
          </div>
        </div>
        <Button1 classes="btn-primary teleport-btn" onClick={()=>this.props.teleport({x:this.state.coordX,y:this.state.coordY})}>Teleport!</Button1>
      </div>
    )
  }
}

export default Teleport;