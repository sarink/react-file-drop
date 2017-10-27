(function(root, factory) {
    if (typeof exports !== "undefined") {
        var React = require("react");
        var PropTypes = require("prop-types");
        var createReactClass = require("create-react-class");
        module.exports = factory(React, PropTypes, createReactClass);
    }
    else if (typeof define === "function" && define.amd) {
        define(["react", "prop-types", "create-react-class"], function(React, PropTypes, createReactClass) {
            return factory(React, PropTypes, createReactClass);
        });
    }
    else {
        factory(root.React, root.PropTypes, root.createReactClass);
    }
}(this, function(React, PropTypes, createReactClass) {

    var FileDrop = createReactClass({
        displayName: "FileDrop",

        propTypes: {
            onDrop: PropTypes.func,
            onDragOver: PropTypes.func,
            onDragLeave: PropTypes.func,
            dropEffect: PropTypes.oneOf(["copy", "move", "link", "none"]),
            targetAlwaysVisible: PropTypes.bool,
            frame: function (props, propName, componentName) {
                var prop = props[propName];
                if (prop == null) {
                    return new Error("Warning: Required prop `" + propName + "` was not specified in `" + componentName + "`");
                }
                if (prop !== document && prop !== window && !(prop instanceof HTMLElement)) {
                    return new Error("Warning: Prop `" + propName + "` must be one of the following: document, window, or an HTMLElement!");
                }
            },
            onFrameDragEnter: PropTypes.func,
            onFrameDragLeave: PropTypes.func,
            onFrameDrop: PropTypes.func
        },

        getDefaultProps: function () {
            return {
                dropEffect: "copy",
                frame: document,
                targetAlwaysVisible: false
            };
        },

        // getInitialState: in componentWillMount, we call this.resetDragging();

        resetDragging: function () {
            this._dragCount = 0;
            this.setState({draggingOverFrame: false, draggingOverTarget: false});
        },

        _handleDrop: function (event) {
            event.preventDefault();
            if (this.props.onDrop) {
                var files = (event.dataTransfer) ? event.dataTransfer.files : (event.frame) ? event.frame.files : undefined;
                this.props.onDrop(files, event);
                this.resetDragging();
            }
        },

        _handleDragOver: function (event) {
            event.preventDefault();
            event.stopPropagation();
            event.dataTransfer.dropEffect = this.props.dropEffect;

            // set active drag state only when file is dragged into
            // (in mozilla when file is dragged effect is "uninitialized")
            var effectAllowed = event.dataTransfer.effectAllowed;
            if (effectAllowed === "all" || effectAllowed === "uninitialized") {
                this.setState({draggingOverTarget: true});
            }

            if (this.props.onDragOver) this.props.onDragOver(event);
        },

        _handleDragLeave: function (event) {
            this.setState({draggingOverTarget: false});
            if (this.props.onDragLeave) this.props.onDragLeave(event);
        },

        _handleFrameDrag: function (event) {
            // We are listening for events on the 'frame', so every time the user drags over any element in the frame's tree,
            // the event bubbles up to the frame. By keeping count of how many "dragenters" we get, we can tell if they are still
            // "draggingOverFrame" (b/c you get one "dragenter" initially, and one "dragenter"/one "dragleave" for every bubble)
            this._dragCount += (event.type === "dragenter" ? 1 : -1);
            if (this._dragCount === 1) {
                if (this.props.onFrameDragEnter) {
					if (this.props.onFrameDragEnter(event) === false) {
						return;
					}
				}
                this.setState({draggingOverFrame: true});
            } else if (this._dragCount === 0) {
                if (this.props.onFrameDragLeave) this.props.onFrameDragLeave(event);
                this.setState({draggingOverFrame: false});
            }
        },

        _handleFrameDrop: function(event) {
            if (!this.state.draggingOverTarget) {
                this.resetDragging();
                if (this.props.onFrameDrop) this.props.onFrameDrop(event);
            }
            this._handleDrop(event);
        },

        render: function () {
            var fileDropTarget;
            var fileDropTargetClassName = "file-drop-target";
            if (this.props.targetAlwaysVisible || this.state.draggingOverFrame) {
                if (this.state.draggingOverFrame) fileDropTargetClassName += " file-drop-dragging-over-frame";
                if (this.state.draggingOverTarget) fileDropTargetClassName += " file-drop-dragging-over-target";
                fileDropTarget = (
                    React.createElement("div", {className: fileDropTargetClassName},
                        this.props.children
                    )
                );
            }
            var className = "file-drop";
            if (this.props.className) {
                className += " " + this.props.className;
            }
            return (
                React.createElement("div", {className: className, onDrop: this._handleDrop, onDragLeave: this._handleDragLeave, onDragOver: this._handleDragOver},
                    fileDropTarget
                )
            );
        },

        _handleWindowDragOverOrDrop: function(event) {
            event.preventDefault();
        },

        componentWillReceiveProps: function(nextProps) {
            if (nextProps.frame !== this.props.frame) {
                this.resetDragging();
                this.stopFrameListeners(this.props.frame);
                this.startFrameListeners(nextProps.frame);
            }
        },

        componentWillMount: function() {
            this.startFrameListeners();
            this.resetDragging();
            window.addEventListener("dragover", this._handleWindowDragOverOrDrop);
            window.addEventListener("drop", this._handleWindowDragOverOrDrop);
        },

        componentWillUnmount: function() {
            this.stopFrameListeners();
            window.removeEventListener("dragover", this._handleWindowDragOverOrDrop);
            window.removeEventListener("drop", this._handleWindowDragOverOrDrop);
        },

        stopFrameListeners: function(frame) {
            frame = frame || this.props.frame;
            frame.removeEventListener("dragenter", this._handleFrameDrag);
            frame.removeEventListener("dragleave", this._handleFrameDrag);
            frame.removeEventListener("drop", this._handleFrameDrop);
        },

        startFrameListeners: function(frame) {
            frame = frame || this.props.frame;
            frame.addEventListener("dragenter", this._handleFrameDrag);
            frame.addEventListener("dragleave", this._handleFrameDrag);
            frame.addEventListener("drop", this._handleFrameDrop);
        }
    });

    if (typeof exports === "undefined" && typeof define !== "function" && !this.ReactFileDrop) {
        this.ReactFileDrop = FileDrop;
    }

    return FileDrop;
}));
