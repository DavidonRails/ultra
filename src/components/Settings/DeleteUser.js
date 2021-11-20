import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, ActivityIndicator, BackHandler} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { AsyncStorage } from 'react-native';
import BtnLittle from '../BtnLittle/BtnLittle'
import  Checkbox from 'react-native-check-box'
import BackBtn from '../BackBtn/BackBtn'
import { RFValue } from "react-native-responsive-fontsize";

export default function DeleteUser (props) {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isChecked, setIsChecked] = useState(false)
    const [notChecked, setNotChecked] = useState(false)


    let deleteUser = async (pass) => {
        if(isChecked){
            await props.deleteUserAccount(pass)
            await AsyncStorage.clear()
            props.setIsLogin(false)
        } else if (!isChecked) {
            setNotChecked(true)
        }
    }
 
	return (
		<View style={styles.container}>
            <BackBtn navigation={props.navigation} color={{color: '#E19784'}}/>
            <Text style={styles.faqTitle}>DELETE MY ACCOUNT</Text>
            <TextInput
                value={password}
				onChangeText={text => setPassword(text)}
                style={styles.passwordInput}
                placeholder="Password"
                placeholderTextColor="#E0927F"
                textAlign="center"
                textContentType="password"
                secureTextEntry={true}
            />
            <Text style={styles.deleteWarning}>ALL PREVIOUS DATE HISTORY WILL BE LOST ONCE YOU DELETE THE APP</Text>
            <View style={styles.deleteCheck}>
                <Checkbox
                    isChecked={isChecked}
                    onClick={() => {
                        setIsChecked(!isChecked);
                        setNotChecked(false)
                    }}
                />
                <Text style={notChecked ? [styles.checkedDel, {color: 'red'}] : styles.checkedDel}>I understand, delete my profile</Text>
            </View>
            <Text style={styles.error}>{error === '' ? props.deleteError : error}</Text>
            {props.loading ? <ActivityIndicator size="large" color="#E29070"  style={{marginTop: 30}}/> 
             :<BtnLittle btn={'Delete'} press={() => deleteUser(password)} style={{marginTop: 30}}/>
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
    fontSize: RFValue(15, 812),
	fontFamily:"AzoSansBold",
	color: '#E19784',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 90,
  },
  passwordInput: {
    width: 260, 
	height: 35, 
	backgroundColor: '#FFFFFF', 
    borderColor: '#E28C67',
    borderWidth: 3,
	borderRadius: 38, 
	marginTop: 24, 
	fontSize: RFValue(13, 812),
	fontFamily:"FrankMedium",
	color: '#E28C67',
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
  }, 
  deleteWarning: {
    width: wp(70),
    fontFamily:"FrankMedium",
    fontSize: RFValue(12, 812),
	fontWeight: 'bold',
	color: '#E19784', 
	textAlign: 'center',
    marginTop: hp(20)
  },
  deleteCheck: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 25
  }, 
  checkedDel: {
    fontFamily:"FrankBold",
    fontSize: RFValue(12, 812),
	fontWeight: 'bold',
	color: '#707070', 
	textAlign: 'center',
    marginLeft: 10,
    textTransform: 'uppercase',
  }
});