import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import ReactFileDrop, { TDivDragEvent } from './ReactFileDrop';

import './demo.css';

const AppWrapper = (props:any) => (<div id="react-hot-loader-wrapper" {...props}>{props.children}</div>);
const HotAppWrapper = hot(module)(AppWrapper);

class Demo extends React.PureComponent {
  handleFileDrop = (files:FileList, event:TDivDragEvent) => {
    console.log(files, event);
  }

  render() {
    var styles = { border: '1px solid black', width: 600, color: 'black', padding: 20 };
    return (
      <div id="react-file-drop-demo" style={styles}>
        <ReactFileDrop onDrop={this.handleFileDrop}>
          Drop some files here!
        </ReactFileDrop>
      </div>
    );
  }
}

const content = (
  <HotAppWrapper>
    <Demo />
  </HotAppWrapper>
);

const dest = document.getElementById('root');
ReactDOM.render(content, dest);
