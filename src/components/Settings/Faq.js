import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, ActivityIndicator} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import BackBtn from '../BackBtn/BackBtn'

export default function Faq (props) {
		return (
			<View  style={styles.container}>
                <BackBtn navigation={props.navigation} color={{color: '#E19784'}}/>
                <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
                <ScrollView style={styles.scrollContainer}>
                    {props.route.params.faq.map((el, index) => {
                        return (
                            <View style={styles.topicBody} key={index}>
                                <Text style={styles.topicTitle}>{el.topic}</Text>
                                <Text style={styles.topicAnswer}>{el.answer}</Text>
                            </View>
                        )
                    })}
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
    paddingLeft: 15,
    paddingRight: 15,
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