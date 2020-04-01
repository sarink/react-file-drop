"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var prop_types_1 = __importDefault(require("prop-types"));
var react_1 = __importDefault(require("react"));
var FileDrop = /** @class */ (function (_super) {
    __extends(FileDrop, _super);
    function FileDrop(props) {
        var _this = _super.call(this, props) || this;
        _this.resetDragging = function () {
            _this.frameDragCounter = 0;
            _this.setState({ draggingOverFrame: false, draggingOverTarget: false });
        };
        _this.handleWindowDragOverOrDrop = function (event) {
            // This prevents the browser from trying to load whatever file the user dropped on the window
            event.preventDefault();
        };
        _this.handleFrameDrag = function (event) {
            // Only allow dragging of files
            if (!FileDrop.eventHasFiles(event))
                return;
            // We are listening for events on the 'frame', so every time the user drags over any element in the frame's tree,
            // the event bubbles up to the frame. By keeping count of how many "dragenters" we get, we can tell if they are still
            // "draggingOverFrame" (b/c you get one "dragenter" initially, and one "dragenter"/one "dragleave" for every bubble)
            // This is far better than a "dragover" handler, which would be calling `setState` continuously.
            _this.frameDragCounter += event.type === 'dragenter' ? 1 : -1;
            if (_this.frameDragCounter === 1) {
                _this.setState({ draggingOverFrame: true });
                if (_this.props.onFrameDragEnter)
                    _this.props.onFrameDragEnter(event);
                return;
            }
            if (_this.frameDragCounter === 0) {
                _this.setState({ draggingOverFrame: false });
                if (_this.props.onFrameDragLeave)
                    _this.props.onFrameDragLeave(event);
                return;
            }
        };
        _this.handleFrameDrop = function (event) {
            if (!_this.state.draggingOverTarget) {
                _this.resetDragging();
                if (_this.props.onFrameDrop)
                    _this.props.onFrameDrop(event);
            }
        };
        _this.handleDragOver = function (event) {
            if (FileDrop.eventHasFiles(event)) {
                _this.setState({ draggingOverTarget: true });
                if (!FileDrop.isIE() && _this.props.dropEffect)
                    event.dataTransfer.dropEffect = _this.props.dropEffect;
                if (_this.props.onDragOver)
                    _this.props.onDragOver(event);
            }
        };
        _this.handleDragLeave = function (event) {
            _this.setState({ draggingOverTarget: false });
            if (_this.props.onDragLeave)
                _this.props.onDragLeave(event);
        };
        _this.handleDrop = function (event) {
            if (_this.props.onDrop && FileDrop.eventHasFiles(event)) {
                var files = event.dataTransfer ? event.dataTransfer.files : null;
                _this.props.onDrop(files, event);
            }
            _this.resetDragging();
        };
        _this.stopFrameListeners = function (frame) {
            if (frame) {
                removeEventListener('dragenter', _this.handleFrameDrag);
                frame.removeEventListener('dragleave', _this.handleFrameDrag);
                frame.removeEventListener('drop', _this.handleFrameDrop);
            }
        };
        _this.startFrameListeners = function (frame) {
            if (frame) {
                frame.addEventListener('dragenter', _this.handleFrameDrag);
                frame.addEventListener('dragleave', _this.handleFrameDrag);
                frame.addEventListener('drop', _this.handleFrameDrop);
            }
        };
        _this.frameDragCounter = 0;
        _this.state = { draggingOverFrame: false, draggingOverTarget: false };
        return _this;
    }
    FileDrop.prototype.componentDidMount = function () {
        this.startFrameListeners(this.props.frame);
        this.resetDragging();
        window.addEventListener('dragover', this.handleWindowDragOverOrDrop);
        window.addEventListener('drop', this.handleWindowDragOverOrDrop);
    };
    FileDrop.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        if (nextProps.frame !== this.props.frame) {
            this.resetDragging();
            this.stopFrameListeners(this.props.frame);
            this.startFrameListeners(nextProps.frame);
        }
    };
    FileDrop.prototype.componentWillUnmount = function () {
        this.stopFrameListeners(this.props.frame);
        window.removeEventListener('dragover', this.handleWindowDragOverOrDrop);
        window.removeEventListener('drop', this.handleWindowDragOverOrDrop);
    };
    FileDrop.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, targetClassName = _a.targetClassName, draggingOverFrameClassName = _a.draggingOverFrameClassName, draggingOverTargetClassName = _a.draggingOverTargetClassName;
        var _b = this.state, draggingOverTarget = _b.draggingOverTarget, draggingOverFrame = _b.draggingOverFrame;
        var fileDropTargetClassName = targetClassName;
        if (draggingOverFrame)
            fileDropTargetClassName += " " + draggingOverFrameClassName;
        if (draggingOverTarget)
            fileDropTargetClassName += " " + draggingOverTargetClassName;
        return (react_1.default.createElement("div", { className: className, onDragOver: this.handleDragOver, onDragLeave: this.handleDragLeave, onDrop: this.handleDrop },
            react_1.default.createElement("div", { className: fileDropTargetClassName }, children)));
    };
    FileDrop.isIE = function () {
        return typeof window !== 'undefined' &&
            (window.navigator.userAgent.indexOf('MSIE') !== -1 ||
                window.navigator.appVersion.indexOf('Trident/') > 0);
    };
    FileDrop.eventHasFiles = function (event) {
        // In most browsers this is an array, but in IE11 it's an Object :(
        var hasFiles = false;
        if (event.dataTransfer) {
            var types = event.dataTransfer.types;
            for (var keyOrIndex in types) {
                if (types[keyOrIndex] === 'Files') {
                    hasFiles = true;
                    break;
                }
            }
        }
        return hasFiles;
    };
    FileDrop.propTypes = {
        className: prop_types_1.default.string,
        targetClassName: prop_types_1.default.string,
        draggingOverFrameClassName: prop_types_1.default.string,
        draggingOverTargetClassName: prop_types_1.default.string,
        onDragOver: prop_types_1.default.func,
        onDragLeave: prop_types_1.default.func,
        onDrop: prop_types_1.default.func,
        dropEffect: prop_types_1.default.oneOf(['copy', 'move', 'link', 'none']),
        frame: function (props, propName, componentName) {
            var prop = props[propName];
            if (prop == null) {
                return new Error('Warning: Required prop `' + propName + '` was not specified in `' + componentName + '`');
            }
            if (prop !== document && prop !== window && !(prop instanceof HTMLElement)) {
                return new Error('Warning: Prop `' + propName + '` must be one of the following: document, HTMLElement!');
            }
        },
        onFrameDragEnter: prop_types_1.default.func,
        onFrameDragLeave: prop_types_1.default.func,
        onFrameDrop: prop_types_1.default.func,
    };
    FileDrop.defaultProps = {
        dropEffect: 'copy',
        frame: typeof window === 'undefined' ? undefined : window.document,
        className: 'file-drop',
        targetClassName: 'file-drop-target',
        draggingOverFrameClassName: 'file-drop-dragging-over-frame',
        draggingOverTargetClassName: 'file-drop-dragging-over-target',
    };
    return FileDrop;
}(react_1.default.PureComponent));
exports.FileDrop = FileDrop;
//# sourceMappingURL=FileDrop.js.map