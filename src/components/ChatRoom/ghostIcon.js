import * as React from "react"
import Svg, { Path, G, Circle } from "react-native-svg"

function Ghost(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={63.903}
      height={89.488}
      viewBox="0 0 63.903 89.488"
      {...props}
    >
      <Path
        data-name="\u041A\u043E\u043D\u0442\u0443\u0440 163"
        d="M1.5 86.126V22.42S6.757 1.5 32.153 1.5s30.251 20.92 30.251 20.92v63.706l-10.22-9.175-8.685 9.175-8.94-9.175-12.3 9.175-8.417-9.175z"
        fill="none"
        stroke="#707070"
        strokeWidth={3}
      />
      <G
        data-name="\u042D\u043B\u043B\u0438\u043F\u0441 116"
        transform="translate(14.135 18.248)"
        fill="#707070"
        stroke="#707070"
      >
        <Circle cx={8} cy={8} r={8} stroke="none" />
        <Circle cx={8} cy={8} r={7.5} fill="none" />
      </G>
      <G
        data-name="\u042D\u043B\u043B\u0438\u043F\u0441 117"
        transform="translate(33.135 18.248)"
        fill="#707070"
        stroke="#707070"
      >
        <Circle cx={8} cy={8} r={8} stroke="none" />
        <Circle cx={8} cy={8} r={7.5} fill="none" />
      </G>
      <G
        data-name="\u042D\u043B\u043B\u0438\u043F\u0441 118"
        transform="translate(26.135 39.248)"
        fill="#707070"
        stroke="#707070"
      >
        <Circle cx={5.5} cy={5.5} r={5.5} stroke="none" />
        <Circle cx={5.5} cy={5.5} r={5} fill="none" />
      </G>
    </Svg>
  )
}

export default Ghost
