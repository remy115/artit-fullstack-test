import React, { Component } from 'react';
import artit_logo from './imgs/artit_logo.png';
import arrow from './imgs/arrow_blue.png';
import './App.css';
import Compass from './components/compass/Compass';
import Titles from './components/titles/Titles';
import Teleport from './components/teleport/Teleport';

class App extends Component {
  constructor(props) {
    super(props)

    this.arrowSize=20;

    this.img=null; // img "arrow" element

    this.direction='N';

    this.sizes={
      divisions:30,
      width:600,
      height:600
    }

    this.squares={
      hor:0,
      ver:0
    }

    this.teleportData=null;

    this.state={
      top:0,
      left:0,
      finalLeft:0,
      finalTop:0,
      rotate:0
    }

    this.engage=this.engage.bind(this);
    this.directionFnc=this.directionFnc.bind(this);
    this.teleport=this.teleport.bind(this);
  }



  createGrid() {
    const coord={width:this.sizes.width,height:this.sizes.height,div:this.sizes.divisions};

    const hor=coord.width/coord.div;
    const ver=coord.height/coord.div;
    this.squares={hor,ver};


    const horDivs=[];
    const verDivs=[];
    for(let i=1;i<=hor;i++) {
      horDivs.push(<div key={i} className="hor"></div>);
    }
    for(let i=1;i<=ver;i++) {
      verDivs.push(<div key={i} className="ver"></div>);
    }
    const gridHor=<div className="grid grid-hor">{horDivs}</div>;
    const gridVer=<div className="grid grid-ver">{verDivs}</div>;


    return {
      vertical:gridVer,
      horizontal:gridHor
    }
  }



  teleport({x,y}) {
    if(x===this.state.left && y===this.state.top) {
      this.img.classList.add('blink2');
      return;
    }
    this.teleportData={x,y};

    // after the "teleport" animation ends, this.engage will run with proper coords (x,y)
    this.img.classList.add('teleport');
  }

  componentDidMount() {
    const listener=(elem)=>{
      elem.classList.remove('blink');
      elem.classList.remove('blink2');
    }
    

    // listening for keyboard events for capturing arrow keys
    // const elem=document.querySelector('body');
    const keyDirsObj={
      ArrowUp:'N',
      ArrowDown:'S',
      ArrowLeft:'W',
      ArrowRight:'E',
    }
    const elem=document;
    elem.addEventListener('keydown',(evt)=>{
      const {key,keyCode}=evt;
      let dir=keyDirsObj[key];
      if(dir) {
        evt.preventDefault();
        this.directionFnc(dir);
      } else if(keyCode===32) {
        evt.preventDefault();
        this.engage();
      }
      // console.log('keypress',evt);
      return false;
    });

    this.img.addEventListener('animationend',(evt)=>{
      const {animationName}=evt;

      if(animationName==='teleport-final') {
        this.img.classList.remove('teleport-end');
      }

      if(animationName==='teleport') {
        this.engage({dirs:{left:this.teleportData.x,top:this.teleportData.y}});
        this.img.classList.remove('teleport');
        this.img.classList.add('teleport-middle');
        setTimeout(()=>{
          this.img.classList.remove('teleport-middle');
          this.img.classList.add('teleport-end');
        },500);
        return;
      }
      // console.log('ANIMATIONEND',evt);
      listener(this.img);
    });
  }

  directionFnc(dir) {
    const dirsObj={E:90,S:180,W:270,N:0};
    this.setState(prevState=>{
      const newDir=dirsObj[dir];
      this.direction=dir;
      return {
        rotate:newDir
      }
    });
  }

  engage(params={}) {
    const {dirs}=params;
    const alertFnc=()=>{
      this.img.classList.add('blink');
    }

    if(dirs) {
      const {left,top}=dirs;
      const finalLeft=left*this.sizes.divisions;
      const finalTop=top*this.sizes.divisions;
      this.setState({top,left,finalLeft,finalTop});
      return;
    }

    const direction=this.direction;
    if(direction==='E' || direction==='W') {
      this.setState((prevState)=>{
        let left;
        if(direction==='E') {
          left=(prevState.left+1);
        } else {
          left=(prevState.left-1);
        }

        let finalLeft;
        finalLeft=left*this.sizes.divisions;

        // console.log('finalLeft',finalLeft);
        if(finalLeft > this.sizes.width) {
          finalLeft=this.sizes.width;
          left--;
          alertFnc();
        } else if(finalLeft < 0) {
          finalLeft=0;
          left++;
          alertFnc();
        }

        return {
          left:left,
          finalLeft:finalLeft
        }
      });
    } else if(direction==='N' || direction==='S') {
      this.setState((prevState)=>{
        let top;
        if(direction==='S') {
          top=(prevState.top+1);
        } else {
          top=(prevState.top-1);
        }

        let finalTop;
        finalTop=top*this.sizes.divisions;
    
        // console.log('finalTop',finalTop);
        if(finalTop > this.sizes.height) {
          finalTop=this.sizes.height;
          top--;
          alertFnc();
        } else if(finalTop < 0) {
          finalTop=0;
          top++;
          alertFnc();
        }

        return {
          top:top,
          finalTop:finalTop
        }
      });

    }
  }

  render() {
    const grids=this.createGrid();


    const finalLeft=this.state.finalLeft-(this.arrowSize/2);
    const finalTop=this.state.finalTop-(this.arrowSize/2);

    return (
      <div className="App">
        <header className="App-header">
          <img src={artit_logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Art IT Fullstack Test</h1>
        </header>
        <p className="App-intro">
          Drive the ATV vehicle throughout the quadrant.
        </p>

        <Titles />
        <div className="content">
          <div className="frame1" onKeyDown={this.keyDown}>
            {grids.vertical}
            {grids.horizontal}
            <img src={arrow} ref={elem=>this.img=elem} style={{top:finalTop,left:finalLeft,transform:'rotate('+this.state.rotate+'deg)'}} className="arrow" alt="" />
          </div>
          <div>

          </div>

          <Teleport squares={this.squares} teleport={this.teleport} />
          <div className="controls">
            <Compass direction={this.directionFnc} onEngage={this.engage} />
          </div>
        </div>

      </div>
    );
  }
}

export default App;
