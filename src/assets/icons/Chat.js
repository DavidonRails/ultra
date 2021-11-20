import * as React from "react"
import Svg, { Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style */

function ChatIco(props) {
  return (
    <Svg
      id="prefix__Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x={0}
      y={0}
      viewBox="0 0 137.48 145.62"
      xmlSpace="preserve"
      {...props}
    >
      <Path
        d="M93.44 17.67H52.07c-18.05 0-32.73 14.68-32.73 32.73v12.52c0 4.44.92 8.87 2.68 12.94 2 4.61 5.06 8.75 8.9 12 2.16 1.84 4.54 3.15 6.97 4.56a16.84 16.84 0 008.94 2.22c3.43-.12 6.85 0 10.28.01 2.62.01 5.23.03 7.85.04l31.15 30.33.13-30.51c17.02-1.41 29.95-14.78 29.95-31.59V50.41c-.01-18.05-14.7-32.74-32.75-32.74zm26.74 45.26c0 14.42-11.83 25.72-26.93 25.72h-2.99l-.09 22.23-22.76-22.16-22.72-.12c-11.42-3.27-19.35-13.77-19.35-25.67V50.41c0-14.74 11.99-26.73 26.73-26.73h41.37c14.74 0 26.73 11.99 26.73 26.73v12.52z"
        fill={props.fill}
      />
    </Svg>
  )
}

export default ChatIco