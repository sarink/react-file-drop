import React, { DragEvent as ReactDragEvent, DragEventHandler as ReactDragEventHandler } from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import FileDrop from './FileDrop';

import './demo.css';

const AppWrapper = (props:any) => (<div id="react-hot-loader-wrapper" {...props}>{props.children}</div>);
const HotAppWrapper = hot(module)(AppWrapper);

class Demo extends React.PureComponent {
  // handleFrameDragEnter = (event:DragEvent) => {
  //   console.log('handleFrameDragEnter', event);
  // }
  //
  // handleFrameDragLeave = (event:DragEvent) => {
  //   console.log('handleFrameDragLeave', event);
  // }
  //
  // handleFrameDrop = (event:DragEvent) => {
  //   console.log('handleFrameDrop', event);
  // }
  //
  // handleDragOver:ReactDragEventHandler<HTMLDivElement> = (event) => {
  //   console.log('handleDragOver', event);
  // }
  //
  // handleDragLeave:ReactDragEventHandler<HTMLDivElement> = (event) => {
  //   console.log('handleDragLeave', event);
  // }

  handleDrop = (files:FileList, event:ReactDragEvent<HTMLDivElement>) => {
    console.log('handleDrop!', files, event);
  }

  render() {
    var styles = { border: '1px solid black', width: 600, color: 'black', padding: 20 };
    return (
      <div id="react-file-drop-demo" style={styles}>
        <FileDrop onDrop={this.handleDrop}>
          Drop some files here!
        </FileDrop>
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
