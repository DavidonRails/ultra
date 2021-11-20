import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, ActivityIndicator} from 'react-native'
import LogoLoginNew from '../../assets/LogoLoginNew';
import {color} from '../../assets/colors'
import BackBtn from '../BackBtn/BackBtn'
import { LinearGradient } from 'expo-linear-gradient'
import Btn from '../Btn/Btn'
import {RFValue} from 'react-native-responsive-fontsize';

export default function ResetPassword (props) {
    const [checkPass, setCheckPass] = useState(false);

    async function checkForm(password) {
		
		if(password != "" && password == props.passwordConfirm) {
			setCheckPass(false)
			if(password.length < 8) {
				props.setErrorText("Error: Password must contain at least eight characters!");
				props.setErrorField('password');
				return false;
			}
			if(password == props.email) {
				props.setErrorText("Error: Password must be different from Username!");
				props.setErrorField('password');
				return false;
			}
			let re = /[0-9]/;
			if(!re.test(password)) {
				props.setErrorText(`Error: password must contain \n  at least one number (0-9)!`);
				props.setErrorField('password');
				return false;
			}
			re = /[a-z]/;
			if(!re.test(password)) {
				props.setErrorText(`Error: password must contain \n  at least one lowercase letter (a-z)!`);
				props.setErrorField('password');
				return false;
			}
			re = /[A-Z]/;
			if(!re.test(password)) {
				props.setErrorText(`Error: password must contain \n  at least one uppercase letter (A-Z)!`);
				props.setErrorField('password');
				return false;
			}
		} else {
			props.setErrorText(`Error: Please check that you've entered \n and confirmed your password!`);
			props.setErrorField('password');
			setCheckPass(true)
			return false;
		}
		await props.resetPasswordThunk(props.email, password, props.route.params.code, props.navigation)
 	}
	
	return (
		<LinearGradient colors={color} style={styles.linearGradient}>
			<BackBtn navigation={props.navigation}/>
			<View style={styles.logo}>
				<LogoLoginNew/>
			</View>
			<Text style={styles.resetText}>Reset your password</Text>
			 <KeyboardAvoidingView
				style={{alignItems: 'center'}}
				behavior={Platform.OS === 'ios' ? 'padding' : null}
				keyboardVerticalOffset={150}>
			<TextInput
				style={props.errorField === "password" ?  [styles.passwordInput, styles.errorField] : styles.passwordInput}
				value={props.password}
				onChangeText={text => props.updatePassword(text)}
				placeholder="Create Password"
				placeholderTextColor="#E19278"
				textAlign="center"
				textContentType="password"
				secureTextEntry={true}
			/>
			<TextInput
				style={checkPass ?  [styles.passwordInput, styles.errorField] : styles.passwordInput}
				value={props.passwordConfirm}
				onChangeText={text => props.updatePasswordConfirm(text)}
				placeholder="Confirm Password"
				placeholderTextColor="#E19278"
				textAlign="center"
				textContentType="password"
				secureTextEntry={true}
			/>
            <Text style={styles.error}>{props.errorText}</Text>
            {props.loading ? <ActivityIndicator size="large" color="#E29070"  style={{marginTop: 50}}/> 
			    : <Btn background={'#ffffff'}
          textColor={'#E19278'} width={189} btn={'Next'} press={() => checkForm(props.password)}/>
            }
			</KeyboardAvoidingView>
		</LinearGradient>
	) 
}

let styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
	display:'flex',
	alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
	justifyContent: 'center'
  },
  passwordInput: {
	width: 260,
    height: 43,
    backgroundColor: '#fff',
    borderRadius: 28,
    marginTop: 18,
    fontSize: RFValue(16, 812),
    fontFamily: 'FrankMedium',
    color: '#707070',
  },
   resetText: {
	fontSize: 16,
	fontFamily:"AzoSansBold",
	textAlign: "center",
	color: '#FFFFFF',
	textTransform: 'uppercase',
	fontWeight: 'bold',
	marginTop: 50,
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