import React from 'react'
import { StyleSheet, Text, View} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFValue } from "react-native-responsive-fontsize";

export default function TimeList (props) {
	return (
		<View style={styles.container}>
          <View style={styles.meetBlock}>
              <View style={styles.dayBlock}>
                <Text style={styles.dayBlockText}>{props.dayStart}</Text>
              </View>
              <Text style={styles.meetText}>Meet {props.name}, {props.timeStart}</Text> 
          </View>           
    </View>
	) 
}

let styles = StyleSheet.create({
  container: {
    marginTop: hp(2),
	  display:'flex',
	  alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingLeft: 25,
    paddingRight: 25,
  },
  meetBlock: {
      width: wp(70),
      height: hp(6),
      backgroundColor: '#ffffff',
      borderRadius: 100,
      paddingLeft: 2,
      borderWidth:3,
      borderColor: '#E0927F',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
  },
  meetText: {
    fontSize: RFValue(16, 812),
    fontFamily:"FrankMedium",
    color: '#E0927F',
  }, 
  photoSize: {
    width: wp(10),
    height: hp(5),
    borderRadius: 100,
    marginRight: 20
  },
  dayBlock: {
    backgroundColor: '#E0927F',
    padding: 13,
    borderRadius: 100,
    marginRight: wp(5)
  },
  dayBlockText: {
    fontSize: RFValue(12, 812),
    color: 'white',
    fontFamily:"FrankMedium",
  }
});