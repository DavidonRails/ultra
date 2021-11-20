import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';

function Stars(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={19}
      height={18}
      marginRight={3}
      viewBox="0 0 19 18"
      {...props}>
      <Rect
        data-name="\u041F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u0438\u043A 149"
        width={19}
        height={18}
        rx={4}
        fill={props.color ? props.color : '#e0927f'}
      />
      <Path
        data-name="\u041A\u043E\u043D\u0442\u0443\u0440 176"
        d="M9.12 15.347c-.731-3.406-2.017-5.689-5.892-6.658 3.765-1.011 5.3-2.529 6.239-6.036.836 3.432 2.646 5.449 6.3 6.243-3.668.449-5.527 2.647-6.647 6.451z"
        fill="#fff"
      />
    </Svg>
  );
}

export default Stars;
