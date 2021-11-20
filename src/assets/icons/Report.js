import * as React from "react"
import Svg, { Circle } from "react-native-svg"

function Report(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384" width={30} height={30} {...props}>
      <Circle cx={192} cy={42.667} r={42.667} fill='#FFFFFF'/>
      <Circle cx={192} cy={192} r={42.667} fill='#FFFFFF'/>
      <Circle cx={192} cy={341.333} r={42.667} fill='#FFFFFF'/>
    </Svg>
  )
}

export default Report