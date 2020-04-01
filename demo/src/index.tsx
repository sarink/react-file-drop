import React from 'react';
import ReactDOM from 'react-dom';
import demoText from '!!raw-loader!./Demo.tsx';
import { Demo } from './Demo';

ReactDOM.render(<Demo />, document.getElementById('demo'));
ReactDOM.render(<div>{demoText}</div>, document.getElementById('demo-text'));
