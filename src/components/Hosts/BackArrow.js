import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function BackArrow(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={12.194}
      height={18.64}
      viewBox="0 0 12.194 18.64"
      {...props}
    >
      <G
        data-name="\u0421\u0433\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C 44"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth={2}
      >
        <Path
          data-name="\u041B\u0438\u043D\u0438\u044F 3"
          d="M1.409 9.32l9.375-7.911"
        />
        <Path
          data-name="\u041B\u0438\u043D\u0438\u044F 4"
          d="M1.409 9.32l9.375 7.911"
        />
      </G>
    </Svg>
  )
}

export default BackArrow