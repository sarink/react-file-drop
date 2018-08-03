# react-file-drop

React component for Gmail or Facebook -like drag and drop file uploader. Drag files anywhere onto the window (or user defined "frame" prop)! Very extensible, provides many hooks so you can use it to develop any custom behavior that you desire.

## fork: @loopmode/react-file-drop

This is a fork of the original [react-file-drop](https://www.npmjs.com/package/react-file-drop) library. It adds support for custom render function for wrappers, and enables it to be used in SVG context.  
It will become obsolete once [this pull request](https://github.com/sarink/react-file-drop/pull/33) is merged.

## V2 is out! See the [changelog](https://github.com/sarink/react-file-drop/blob/master/CHANGELOG.md) before upgrading

## Demo/Example

http://sarink.github.io/react-file-drop/dist/Demo - A very simple demo with example code and sample CSS

## By default, there are no styles! You must include some CSS if you want to see anything!

You can grab the [demo CSS](https://raw.githubusercontent.com/sarink/react-file-drop/master/src/Demo/Demo.css) to get started

## Browser support

✅ Chrome <br/>
✅ Firefox <br/>
✅ Safari <br/>
✅ IE 11 <br/>
✅ IE Edge <br/>

## Typescript?

Yup! (For typing event handlers, use the native DragEvent for frame handlers, and the React lib's DragEvent for others)

## Why?

I wanted that behavior like facebook, gmail, etc. have where a part of the page highlights immediately when you start dragging a file anywhere on the window. I couldn't find any React component that already did this, so, I made one.

## Installation

`npm install react-file-drop`

## Usage

`import FileDrop from 'react-file-drop`

## How it works

First, you define the `frame` prop (default is the `document`), whenever the user begins dragging file(s) anywhere over this frame, the `<div class="file-drop-target">` will be inserted into the DOM.  
Next, define an `onDrop` prop, whenever a user drops their files onto the target, this callback will be triggered.  
Lastly, you'll need to style it. Check out the Styling section below for details.

## Props

##### onDrop - function(files, event)

Callback when the user drops files onto the target

##### onDragOver - function(event)

Callback when the user is dragging over the target. Also adds the `file-drop-dragging-over-target` class to the `file-drop-target`

##### onDragLeave - function(event)

Callback when the user leaves the target. Removes the `file-drop-dragging-over-target` class from the `file-drop-target`

##### dropEffect - String "copy" || "move" || "link" || "none" (default: "copy")

Learn more about [HTML5 dropEffects](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer#dropEffect.28.29). Not available in IE :(

##### frame - document || HTMLElement (default: document)

This is the "scope" or frame that the user must drag some file(s) over to kick things off.

##### onFrameDragEnter - function(event)

Callback when the user begins dragging over the `frame`

##### onFrameDragLeave - function(event)

Callback when the user stops dragging over the `frame`

##### onFrameDrop - function(event)

Callback when the user drops files _anywhere_ over the `frame`

##### outerComponent - String || function(props) (default: div)

Component or tag name for rendering the outer wrapper.

##### innerComponent - String || function(props) (default: div)

Component or tag name for rendering the inner wrapper.

Supported types for `outerComponent` and `innerComponent`:

*   String - Any HTML or SVG tag name like `div`, `span`, `g` etc.
*   Function - A render function or component class. Receives props and renders a react element.
    *   props passed to `outerComponent`: `className, onDragOver, onDragLeave, onDrop`
    *   props passed to `innerComponent`: `className`
    *   example: component class: `<FileDrop outerComponent={MyReactComponent}>`
    *   example: render function: `<FileDrop outerComponent={(props) => <span {...props} />} />`

## Styling

By default, the component comes with no styles. You can grab the [demo CSS](https://raw.githubusercontent.com/sarink/react-file-drop/master/src/Demo/Demo.css) to get you started.

##### .file-drop

The outer container element

##### .file-drop > .file-drop-target

This is the target the user has to drag their files to. It will be inserted into the DOM whenever the user starts dragging over the frame.

##### .file-drop > .file-drop-target.file-drop-dragging-over-frame

The `file-drop-dragging-over-frame` class will be added to the `file-drop-target` whenever the user begins dragging a file over the `frame`, and it will be removed when they leave

##### .file-drop > .file-drop-target.file-drop-dragging-over-target

The `file-drop-dragging-over-target` class will be added to the `file-drop-target` whenever the user begins dragging a file over the `file-drop-target` div, and it will be removed when they leave
