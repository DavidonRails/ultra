import * as React from "react"
import Svg, { Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style */

function HourglassIco(props) {
  return (
    <Svg
      id="prefix__Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x={0}
      y={0}
      viewBox="0 0 111.34 162.11"
      xmlSpace="preserve"
      {...props}
    >
      <Path
        className="prefix__st0"
        d="M74.27 69.19l29.9-52.45h-97l29.14 52.23c8.92 15.98 28.91 16.1 37.96.22zM0 0h111.34v11.47H0z"
      />
      <Path
        className="prefix__st0"
        d="M37.07 92.92l-29.9 52.45h97L75.03 93.14c-8.92-15.98-28.91-16.1-37.96-.22z"
      />
      <Path
        transform="rotate(-180 55.67 156.38)"
        className="prefix__st0"
        d="M0 150.65h111.34v11.47H0z"
      />
    </Svg>
  )
}

export default HourglassIco