# react-file-drop
React component for Gmail or Facebook -like drag and drop file uploader. Drag files anywhere onto the window (or user defined "frame" prop)! Very extensible, provides many hooks so you can use it to develop any custom behavior that you desire.

### By default, no styles are applied, but props are available to customize styling based on the component's state.

## Demo/Example
There's a very simple demo of an earlier version of the package, with example code and CSS, available [here](http://sarink.github.io/react-file-drop/demo/).  

If this doesn't look very fancy, it's because it's not meant to! You are encouraged to style it yourself. 

## Installation
* As an npm module: ``npm install react-file-drop``
* Stand-alone: [download the source](https://raw.githubusercontent.com/sarink/react-file-drop/master/FileDrop.js)

## Why?
I wanted that behavior like facebook, gmail, etc. have where a part of the page highlights immediately when you start dragging a file anywhere on the window. I couldn't find any React component that already did this, so, I made one.

## Usage
* As a module: ``var FileDrop = require("react-file-drop");``
* Stand-alone: ``window.ReactFileDrop``

## How it works
First, you define the ``frame`` prop (default is the ``document``), whenever the user begins dragging file(s) anywhere over this frame, the ``<div class="file-drop-target">`` will be inserted into the DOM.  
Next, define an ``onDrop`` prop, whenever a user drops their files onto the target, this callback will be triggered.  
Lastly, you'll need to style it. Check out the Styling section below for details.

## Props
##### onDrop - function(files, event)
Callback when the user drops files onto the target

##### onDragOver - function(event)
Callback when the user is dragging over the target. Also adds the ``file-drop-dragging-over-target`` class to the ``file-drop-target``

##### onDragLeave - function(event)
Callback when the user leaves the target. Removes the ``file-drop-dragging-over-target`` class from the ``file-drop-target``

##### dropEffect - String "copy" || "move" || "link" || "none" (default: "copy")
Learn more about [HTML5 dropEffects](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer#dropEffect.28.29)

##### targetAlwaysVisible - Boolean (default: false)
If you'd like the drop target to always be visible (otherwise, it's only visible when the user begins dragging over the ``frame``)

##### frame - document || window || HTMLElement  (default: document)
This is the "scope" or frame that the user must drag some file(s) over to kick things off.

##### onFrameDragEnter - function(event)
Callback when the user begins dragging over the ``frame``

##### onFrameDragLeave - function(event)
Callback when the user stops dragging over the ``frame``

##### onFrameDrop - function(event)
Callback when the user drops files *anywhere* over the ``frame``

##### style - Object
Inline styles to apply to the outer container element.

##### dropTargetStyles - Object {base: Object, draggingOverFrame: Object, draggingOverTarget: Object}
Inline styles to apply to the drop target element. This is the target the user has to drag their files to. It will be inserted into the DOM whenever the user starts dragging over the frame, or if you set ``targetAlwaysVisible={true}``.
* The ``base`` style is always set.
* The ``draggingOverFrame`` style is additionally applied while the user is dragging a file over the ``frame``.
* The ``draggingOverTarget`` style is additionally applied while the user is dragging a file over the drop target element. 
