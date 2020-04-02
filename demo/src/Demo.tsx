// Demo.tsx

import React from 'react';
import { FileDrop } from 'react-file-drop';
import './Demo.css';

export const Demo = () => {
  const styles = { border: '1px solid black', width: 600, color: 'black', padding: 20 };
  return (
    <div>
      <h1>React File Drop demo</h1>
      <div style={styles}>
        <FileDrop
          onFrameDragEnter={(event) => console.log('onFrameDragEnter', event)}
          onFrameDragLeave={(event) => console.log('onFrameDragLeave', event)}
          onFrameDrop={(event) => console.log('onFrameDrop', event)}
          onDragOver={(event) => console.log('onDragOver', event)}
          onDragLeave={(event) => console.log('onDragLeave', event)}
          onDrop={(files, event) => console.log('onDrop!', files, event)}
        >
          Drop some files here!
        </FileDrop>
      </div>
    </div>
  );
};
