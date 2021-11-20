import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ArrowRight(props) {
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
        d="M5.947 1.251L16.14 11.613A3 3 0 0117 13.717v.566a3 3 0 01-.861 2.104L5.947 26.75a4.159 4.159 0 01-5.947 0L12.54 14 0 1.251a4.159 4.159 0 015.947 0z"
        fill="#fff"
      />
    </Svg>
  )
}

export default ArrowRight
