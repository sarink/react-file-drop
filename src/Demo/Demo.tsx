import React, { DragEvent as ReactDragEvent, DragEventHandler as ReactDragEventHandler } from 'react';
import ReactDOM from 'react-dom';

import FileDrop from 'src/FileDrop/FileDrop';
import SvgExample from './SvgExample';

import './Demo.css';

class Demo extends React.Component {
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
    var styles = { border: '1px solid black', width: 600, color: 'black', padding: 20, marginBottom: 20 };
    return (
      <div id="react-file-drop-demo">
        <div style={styles}> 
        <FileDrop onDrop={this.handleDrop}>
          Drop some files here!
        </FileDrop>
        </div>
        <div style={styles}>
          Works with SVG too - drop files on the shapes
          <SvgExample onDrop={this.handleDrop} />
        </div>
      </div>
    );
  }
}

const dest = document.getElementById('root');
const content = <Demo />;
ReactDOM.render(content, dest);
