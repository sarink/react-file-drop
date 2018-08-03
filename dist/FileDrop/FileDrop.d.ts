/// <reference types="react" />
import PropTypes from 'prop-types';
import React, { DragEvent as ReactDragEvent, DragEventHandler as ReactDragEventHandler } from 'react';
export declare type TDropEffects = 'copy' | 'move' | 'link' | 'none';
export interface IFileDropProps {
    className?: string;
    frame?: HTMLElement | Document;
    onFrameDragEnter?: (event: DragEvent) => void;
    onFrameDragLeave?: (event: DragEvent) => void;
    onFrameDrop?: (event: DragEvent) => void;
    onDragOver?: ReactDragEventHandler<HTMLDivElement>;
    onDragLeave?: ReactDragEventHandler<HTMLDivElement>;
    onDrop?: (files: FileList, event: ReactDragEvent<HTMLDivElement>) => any;
    dropEffect?: TDropEffects;
    outerComponent?: any;
    innerComponent?: any;
}
export interface IFileDropState {
    draggingOverFrame: boolean;
    draggingOverTarget: boolean;
}
declare class FileDrop extends React.PureComponent<IFileDropProps, IFileDropState> {
    static defaultProps: {
        dropEffect: TDropEffects;
        frame: Document;
        outerComponent: string;
        innerComponent: string;
    };
    static propTypes: {
        outerComponent: PropTypes.Requireable<any>;
        innerComponent: PropTypes.Requireable<any>;
        onDragOver: PropTypes.Requireable<any>;
        onDragLeave: PropTypes.Requireable<any>;
        onDrop: PropTypes.Requireable<any>;
        dropEffect: PropTypes.Requireable<any>;
        frame: (props: any, propName: any, componentName: any) => Error;
        onFrameDragEnter: PropTypes.Requireable<any>;
        onFrameDragLeave: PropTypes.Requireable<any>;
        onFrameDrop: PropTypes.Requireable<any>;
    };
    frameDragCounter: number;
    constructor(props: IFileDropProps);
    static isIE: () => boolean;
    static eventHasFiles: (event: DragEvent | React.DragEvent<HTMLElement>) => boolean;
    resetDragging: () => void;
    handleWindowDragOverOrDrop: (event: DragEvent) => void;
    handleFrameDrag: (event: DragEvent) => void;
    handleFrameDrop: (event: DragEvent) => void;
    handleDragOver: ReactDragEventHandler<HTMLDivElement>;
    handleDragLeave: ReactDragEventHandler<HTMLDivElement>;
    handleDrop: ReactDragEventHandler<HTMLDivElement>;
    stopFrameListeners: (frame: HTMLElement | Document) => void;
    startFrameListeners: (frame: HTMLElement | Document) => void;
    componentWillReceiveProps(nextProps: IFileDropProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default FileDrop;
