import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from "react-native-responsive-fontsize";

const StatusBar = (props) => {
  return (
    <View style={styles.container}>
      <ProgressCircle
        percent={100}
        radius={29}
        borderWidth={6}
        outerCircleStyle={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: hp(1),
        }}
        containerStyle={{
          backgroundColor: '#F0F0F0',
        }}
        color="#E0927F"
        shadowColor="#959595"
        bgColor="#fff">
        <Text style={{color: '#E0927F', fontFamily: 'FrankMedium', fontSize: RFValue(13, 812)}}>{props.progress}</Text>
      </ProgressCircle>
      <Text style={styles.progressCategory}>{props.progressCategory}</Text>
    </View>
  );
};

let styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    progressCategory: {
        fontSize: RFValue(10, 812),
        maxWidth: '100%',
        textAlign: 'center',
        color: '#E0927F',
        fontFamily: 'FrankMedium',
    }
})

export default StatusBar;
