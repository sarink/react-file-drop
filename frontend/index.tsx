import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

// import 'styles/globalStyles.scss';
import ReactFileDrop from 'components/ReactFileDrop';

const AppWrapper = (props:any) => (<div {...props}>{props.children}</div>);
const HotAppWrapper = hot(module)(AppWrapper);
const content = (
  <HotAppWrapper>
    <ReactFileDrop />
  </HotAppWrapper>
);

const dest = document.getElementById('root');
ReactDOM.render(content, dest);
