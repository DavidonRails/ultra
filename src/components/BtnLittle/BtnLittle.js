import React from 'react'
import { StyleSheet, Text, TouchableOpacity} from 'react-native'
import { RFValue } from "react-native-responsive-fontsize";

export default function BtnLittle (props) {

	return (
			<TouchableOpacity 
				style={[styles.btnNext, props.style]}
				onPress={() => props.press()}
			>
				<Text style={[styles.btnNextText, props.styleText]}>{props.btn}</Text>
			</TouchableOpacity>
	)
}

let styles = StyleSheet.create({
  btnNext: {
    width: 134,
	display:'flex',
	alignItems: 'center',
	justifyContent: 'center',
	marginTop: 50,
	backgroundColor: '#E29070', 
	height: 40,
	borderRadius: 20, 
  },
  btnNextText: {
	fontSize: RFValue(18, 812),
	fontFamily:"FrankMedium",
	textAlign: "center",
	color: '#FFFFFF'
  },
});