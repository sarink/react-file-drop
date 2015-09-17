var React = require('react');
var ReactFileDrop = require('../');

document.addEventListener("DOMContentLoaded", function() {
    var _handleFileDrop = function(files, event) {
        console.log('onDrop', files, event);
    };

    var containerStyle = {
        border: "1px solid black",
        width: 600,
        color: "black",
        padding: 20
    };
    var style = {
        position: "relative",
        height: 100,
        width: "100%"
    };
    var dropTargetStyles = {
        base: {
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            borderRadius: 2,
            transition: "all 150ms linear",
            opacity: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center"
        },
        draggingOverFrame: {
            border: "none",
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            boxShadow: "none",
            zIndex: 50,
            opacity: 1.0,
            color: "white"
        },
        draggingOverTarget: {
            color: "#ff6e40",
            boxShadow: "0 0 13px 3px #ff6e40"
        }
    };

    var myUploader = React.createElement(
        "div", {
            style: containerStyle
        },
        "This is the uploader div. Try dragging a file!",
        React.createElement(
            ReactFileDrop, {
                onDrop: _handleFileDrop,
                frame: document,
                dropEffect: "copy",
                style: style,
                dropTargetStyles: dropTargetStyles
            },
            "Drop some files here!"
        )
    );

    React.render(myUploader, document.getElementById("demo-contents"))
});
