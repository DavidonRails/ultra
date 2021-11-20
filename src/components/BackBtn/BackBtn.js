import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from "react-native-responsive-fontsize";

export default function BackBtn(props) {
  let back = () => {
    props.navigation.goBack();
    props.clearReducer ? props.clearReducer() : null;
  };

  return (
    <TouchableOpacity
      style={[styles.btnBack, props.top]}
      onPress={() => {
        props.navigation === null ? props.backHandler() : back();
      }}>
      <Text style={[styles.btnBackText, props.color]}>Back</Text>
    </TouchableOpacity>
  );
}

let styles = StyleSheet.create({
  btnBack: {
    position: 'absolute',
    top: 40,
    left: 35,
    zIndex: 10,
  },
  btnBackText: {
    fontSize: RFValue(16, 812),
    fontFamily: 'FrankBold',
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
