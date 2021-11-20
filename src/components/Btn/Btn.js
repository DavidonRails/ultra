import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from "react-native-responsive-fontsize";

export default function Btn(props) {
  return (
    <TouchableOpacity
      style={[
        styles.btnNext,
        {
          width: props.width,
          backgroundColor: props.background ? props.background : '#E3936F',
        },
      ]}
      onPress={() => props.press()}>
      <Text
        style={[
          styles.btnNextText,
          {color: props.textColor ? props.textColor : '#FFFFFF'},
        ]}>
        {props.btn}
      </Text>
    </TouchableOpacity>
  );
}

let styles = StyleSheet.create({
  btnNext: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(2),
    height: 40,
    borderRadius: 20,
  },
  btnNextText: {
    fontSize: RFValue(18, 812),
    fontFamily: 'FrankMedium',
    textAlign: 'center',
  },
});
