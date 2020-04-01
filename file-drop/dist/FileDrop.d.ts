import PropTypes from 'prop-types';
import React, { DragEvent as ReactDragEvent, DragEventHandler as ReactDragEventHandler } from 'react';
export declare type DropEffects = 'copy' | 'move' | 'link' | 'none';
export interface FileDropProps {
    className?: string;
    targetClassName?: string;
    draggingOverFrameClassName?: string;
    draggingOverTargetClassName?: string;
    frame?: Exclude<HTMLElementTagNameMap[keyof HTMLElementTagNameMap], HTMLElement> | HTMLDocument;
    onFrameDragEnter?: (event: DragEvent) => void;
    onFrameDragLeave?: (event: DragEvent) => void;
    onFrameDrop?: (event: DragEvent) => void;
    onDragOver?: ReactDragEventHandler<HTMLDivElement>;
    onDragLeave?: ReactDragEventHandler<HTMLDivElement>;
    onDrop?: (files: FileList | null, event: ReactDragEvent<HTMLDivElement>) => any;
    dropEffect?: DropEffects;
}
export interface FileDropState {
    draggingOverFrame: boolean;
    draggingOverTarget: boolean;
}
export declare class FileDrop extends React.PureComponent<FileDropProps, FileDropState> {
    static isIE: () => boolean;
    static eventHasFiles: (event: DragEvent | React.DragEvent<HTMLElement>) => boolean;
    static propTypes: {
        className: PropTypes.Requireable<string>;
        targetClassName: PropTypes.Requireable<string>;
        draggingOverFrameClassName: PropTypes.Requireable<string>;
        draggingOverTargetClassName: PropTypes.Requireable<string>;
        onDragOver: PropTypes.Requireable<(...args: any[]) => any>;
        onDragLeave: PropTypes.Requireable<(...args: any[]) => any>;
        onDrop: PropTypes.Requireable<(...args: any[]) => any>;
        dropEffect: PropTypes.Requireable<string>;
        frame: (props: any, propName: any, componentName: any) => Error | undefined;
        onFrameDragEnter: PropTypes.Requireable<(...args: any[]) => any>;
        onFrameDragLeave: PropTypes.Requireable<(...args: any[]) => any>;
        onFrameDrop: PropTypes.Requireable<(...args: any[]) => any>;
    };
    static defaultProps: {
        dropEffect: DropEffects;
        frame: Document | undefined;
        className: string;
        targetClassName: string;
        draggingOverFrameClassName: string;
        draggingOverTargetClassName: string;
    };
    constructor(props: FileDropProps);
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: FileDropProps): void;
    componentWillUnmount(): void;
    frameDragCounter: number;
    resetDragging: () => void;
    handleWindowDragOverOrDrop: (event: DragEvent) => void;
    handleFrameDrag: (event: DragEvent) => void;
    handleFrameDrop: (event: DragEvent) => void;
    handleDragOver: ReactDragEventHandler<HTMLDivElement>;
    handleDragLeave: ReactDragEventHandler<HTMLDivElement>;
    handleDrop: ReactDragEventHandler<HTMLDivElement>;
    stopFrameListeners: (frame: HTMLDocument | undefined) => void;
    startFrameListeners: (frame: HTMLDocument | undefined) => void;
    render(): JSX.Element;
}
