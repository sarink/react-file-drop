import React from 'react';
import FileDrop from 'src/FileDrop/FileDrop';

class SvgGroup extends React.Component {
  render() {
    return <g {...this.props} />;
  }
}

export default function SvgExample({ onDrop }: { onDrop?: any}) {
  return (
    <svg width="600" height="100">
      <defs>
        <GlowFilter id="glow-orange" color="#ff6e40" />
        <GlowFilter id="glow-blue" color="#00ecff" />
      </defs>
 
      <g transform="translate(70 50)">
        <FileDrop onDrop={onDrop} outerComponent="g" innerComponent="g">
          <circle r="30" fill="black"></circle>
        </FileDrop>
      </g>

      <FileDrop onDrop={onDrop} outerComponent="g" innerComponent="g">
        <g transform="translate(150 2)">
          <g height="48" width="48" transform="rotate(180 48 48) scale(2)">
            <path fill="#00BCD4" d="M24,30c-3.3,0-6-2.7-6-6s2.7-6,6-6V5C13.5,5,5,13.5,5,24s8.5,19,19,19c4.4,0,8.5-1.5,11.8-4.1l-8-10.2 C26.7,29.5,25.4,30,24,30z"/>
            <path fill="#448AFF" d="M30,24h13c0-10.5-8.5-19-19-19v13C27.3,18,30,20.7,30,24z"/>
            <path fill="#3F51B5" d="M43,24H30c0,1.9-0.9,3.6-2.3,4.7l8,10.2C40.2,35.4,43,30,43,24z"/>
          </g>
        </g>
      </FileDrop>

      {/* using components instead of strings */}
      <g transform="translate(280 2)">
        <g height="48" width="48" transform="scale(2)">
          <path fill="#00BCD4" d="M24,30c-3.3,0-6-2.7-6-6s2.7-6,6-6V5C13.5,5,5,13.5,5,24s8.5,19,19,19c4.4,0,8.5-1.5,11.8-4.1l-8-10.2 C26.7,29.5,25.4,30,24,30z"/>
          <path fill="#448AFF" d="M30,24h13c0-10.5-8.5-19-19-19v13C27.3,18,30,20.7,30,24z"/>
          <FileDrop onDrop={onDrop} outerComponent={SvgGroup} innerComponent={SvgGroup}>
            <path fill="#3F51B5" d="M43,24H30c0,1.9-0.9,3.6-2.3,4.7l8,10.2C40.2,35.4,43,30,43,24z"/>
          </FileDrop>
        </g>
      </g>

      {/* using render functions instead of strings */}
      <FileDrop onDrop={onDrop}
        outerComponent={(props: any) => <g {...props} />}
        innerComponent={(props: any) => (
          <g {...props}>
            <title>Drop files on this banana!</title>
            {props.children}
          </g>
        )}
      >
        <g transform="translate(400 55)">
          <image transform="rotate(-30 0 0)" width="110" height="70" xlinkHref="https://upload.wikimedia.org/wikipedia/commons/f/f7/Bananas.svg" />
        </g>
      </FileDrop>
    </svg>
  );
}


function GlowFilter({ id, color }: { id?: string, color?: string }) {
    return (
      <filter height="300%" width="300%" x="-75%" y="-75%" id={id}> 
        <feMorphology operator="dilate" radius="4" in="SourceAlpha" result="thicken" />
        <feGaussianBlur in="thicken" stdDeviation="4" result="blurred" />
        <feFlood floodColor={color} result="glowColor" />
        <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow_colored" />
        <feMerge>
            <feMergeNode in="softGlow_colored" />
            <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    );
}
