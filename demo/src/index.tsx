import React from 'react';
import ReactDOM from 'react-dom';
import { Demo } from './Demo';
import demoTsx from '!!raw-loader!./Demo';
import demoCss from '!!raw-loader!./Demo.css';

ReactDOM.render(<Demo />, document.getElementById('demo'));
ReactDOM.render(<div>{demoTsx}</div>, document.getElementById('demo-tsx'));
ReactDOM.render(<div>{demoCss}</div>, document.getElementById('demo-css'));
