import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, ActivityIndicator} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import BackBtn from '../BackBtn/BackBtn'

export default function MyAnswers (props) {
    useEffect(()=> {
        props.setMyAnswersHandler()
    },[])
    let getAnswersList = () => {
        let answers;
        answers = props.myAnswers.map((el, index) => {
                return(
                    <View key={index} style={styles.topicBody}>
                        <Text style={styles.topicTitle}>{el.topic.topic}</Text>
                        <Text style={styles.topicAnswer}>{el.question.question}</Text>
                    </View>
                )
        })
        return answers
    }
		return (
			<View  style={styles.container}>
                <BackBtn navigation={props.navigation} color={{color: '#E19784'}}/>
                <Text style={styles.faqTitle}>My answers</Text>
                <ScrollView style={styles.scrollContainer}>
                {props.loading ? <ActivityIndicator size="large" color="#E29070"  style={{marginTop: wp(70)}}/> : getAnswersList()}
                </ScrollView>
            </View>
		) 
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
	  display:'flex',
	  alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 40,
	  justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
  },
  topicBody: {
    display:'flex',
	alignItems: 'flex-start',
    marginTop: hp(5),
    paddingLeft: wp(10),
    paddingRight: wp(10),
    width: wp(100)
  },
  faqTitle: {
    fontSize: hp(2.75),
	  fontFamily:"AzoSansBold",
	  color: '#E19784',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  topicTitle: {
    fontSize: hp(2),
	  fontFamily:"AzoSansBold",
	  color: '#707070',
    fontWeight: 'bold',
    marginBottom: 10
  },
  topicAnswer: {
    textAlign: 'left',
    fontSize: hp(2),
	  fontFamily:"AzoSans",
	  color: '#707070',
  }
});