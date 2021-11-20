import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style */

function ProfileIco(props) {
  return (
    <Svg
      id="prefix__Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x={0}
      y={0}
      viewBox="0 0 137.62 120.78"
      xmlSpace="preserve"
      fill='black'
      {...props}
    >
      <Path
        className="prefix__st256"
        d="M71.56 62.66c15.54 0 28.19-12.65 28.19-28.19S87.1 6.27 71.56 6.27s-28.19 12.65-28.19 28.2 12.64 28.19 28.19 28.19zm0-50.39c12.24 0 22.19 9.96 22.19 22.19 0 12.24-9.96 22.19-22.19 22.19-12.24 0-22.19-9.96-22.19-22.19s9.95-22.19 22.19-22.19zM71.56 66.73c-25.4 0-46.06 22.46-46.06 50.06h6c0-24.29 17.97-44.06 40.06-44.06s40.06 19.76 40.06 44.06h6c0-27.61-20.67-50.06-46.06-50.06z"
        fill={props.fill}
      />
    </Svg>
  )
}

export default ProfileIco