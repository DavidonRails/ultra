import * as React from "react"
import Svg, { Path } from "react-native-svg"

function InfoIco(props) {
  return (
    <Svg
      width={24}
      height={24}
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      {...props}
    >
      <Path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12S0 18.623 0 12 5.377 0 12 0zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11S1 18.071 1 12 5.929 1 12 1zm.5 17h-1V9h1v9zM12 6a.845.845 0 110 1.69A.845.845 0 0112 6z" fill={'#fff'} />
    </Svg>
  )
}

export default InfoIco
