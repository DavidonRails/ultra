import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, ActivityIndicator, BackHandler} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import BtnLittle from '../BtnLittle/BtnLittle'
import BackBtn from '../BackBtn/BackBtn'

export default function ChangeGeo (props) {
    const [geo, setGeo] = useState('')


	return (
		<View style={styles.container}>
            <BackBtn navigation={props.navigation} color={{color: '#E19784'}}/>
            <Text style={styles.faqTitle}>Change my location</Text>
            <TextInput
                value={geo}
				onChangeText={text => setGeo(text)}
                style={styles.passwordInput}
                placeholder="Location"
                placeholderTextColor="#707070"
                textAlign="center"
            />
            {props.loading ? <ActivityIndicator size="large" color="#E29070"  style={{marginTop: 100}}/> 
             :<BtnLittle btn={'Save'} press={() => props.changeUserLocation(geo, props.navigation)}/>
             }
        </View>
	) 
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
	display:'flex',
	alignItems: 'center',
    paddingTop: 80,
	justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  faqTitle: {
    fontSize: hp(2.75),
	fontFamily:"AzoSansBold",
	color: '#E19784',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  passwordInput: {
    width: 267, 
	height: 55, 
	backgroundColor: '#FFFFFF', 
    borderColor: '#707070',
    borderWidth: 1,
	borderRadius: 38, 
	marginTop: 45, 
	fontSize: 16,
	fontFamily:"AzoSans",
	color: '#707070',
	paddingLeft: 10,
	paddingRight: 10,
  },
  error: {
	fontFamily:"AzoSansBold",
	fontWeight: 'bold',
	color: 'red', 
	position:'relative',
	top: 25,
	textAlign: 'center'
  }
});