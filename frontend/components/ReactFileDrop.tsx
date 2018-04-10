import React from 'react';
import PropTypes from 'prop-types';


interface IProps {}
interface IState {}

class ReactFileDrop extends React.PureComponent<IProps, IState> {
  constructor(props:IProps) {
    super(props);
    this.state = {};
  }

  // propTypes = {
  //   onDrop: PropTypes.func,
  //   onDragOver: PropTypes.func,
  //   onDragLeave: PropTypes.func,
  //   dropEffect: PropTypes.oneOf(["copy", "move", "link", "none"]),
  //   targetAlwaysVisible: PropTypes.bool,
  //   disableDoubleDrop: PropTypes.bool,
  //   frame: function(props, propName, componentName) {
  //     var prop = props[propName];
  //     if (prop == null) {
  //       return new Error("Warning: Required prop `" + propName + "` was not specified in `" + componentName + "`");
  //     }
  //     if (prop !== document && prop !== window && !(prop instanceof HTMLElement)) {
  //       return new Error("Warning: Prop `" + propName + "` must be one of the following: document, window, or an HTMLElement!");
  //     }
  //   },
  //   onFrameDragEnter: PropTypes.func,
  //   onFrameDragLeave: PropTypes.func,
  //   onFrameDrop: PropTypes.func
  // };

  render() {
    return (
      <div>
        ReactFileDrop!
      </div>
    );
  }
}

export default ReactFileDrop;
