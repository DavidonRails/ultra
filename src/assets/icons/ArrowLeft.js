import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ArrowLeft(props) {
  return (
    <Svg
      width={17}
      height={28}
      viewBox="0 0 17 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11.053 1.251L.86 11.613A3 3 0 000 13.717v.566a3 3 0 00.861 2.104L11.053 26.75a4.159 4.159 0 005.947 0L4.46 14 17 1.251a4.159 4.159 0 00-5.947 0z"
        fill={props.arrow ? props.arrow : "#fff"}
      />
    </Svg>
  )
}

export default ArrowLeft