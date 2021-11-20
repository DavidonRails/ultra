import React from 'react'
import { StyleSheet, Text, View} from 'react-native'
import RadioForm from 'react-native-simple-radio-button';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { RFValue } from "react-native-responsive-fontsize";

export default function Questionnaire (props) {
const [value, setValue] = React.useState(null);	

    let checkInitial = () => {
      let indexInit = -1;
      props.questions.forEach((element, index) => {
        if(element.id === props.isAnswer) {
          indexInit = index
        }
      });
      return indexInit
    }

		return (
        <View style={{display: 'flex', alignItems:'flex-start', justifyContent:'flex-start', width: wp(80)}}>
            <Text style={[styles.questionTitle, props.colorTittle]}>{props.topic}</Text>
            <RadioForm
              radio_props={props.questions.map((el) => ({label: el.question, value: el.id})  )}
              initial={checkInitial()}
              buttonColor={props.buttonColor ? props.buttonColor : '#fff'}
              selectedButtonColor={props.buttonColor ? props.buttonColor : '#fff'}
              buttonSize={hp(3)}
              buttonOuterSize={hp(3)}
              labelStyle={[styles.labelStyle, props.label]}
              onPress={(value) => {
                props.setAnswerArr(value, props.topicId)
                setValue(value)
              }}
            />
        </View>
		) 
}

let styles = StyleSheet.create({
    labelStyle: {
      fontSize: RFValue(16, 812),
      fontFamily:"FrankRegular",
      textAlign: "left",
      color: '#FFFFFF',
    }, 
    questionTitle: {
      fontSize: RFValue(16, 812),
      fontFamily:"FrankMedium",
      textAlign: "left",
      color: '#FFFFFF',
      marginBottom: hp(1.5),
      marginTop: hp(1.5),
    }
});